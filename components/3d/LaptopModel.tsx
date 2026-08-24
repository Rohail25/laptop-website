"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { createLogoTexture, createScreenTexture } from "./screenTexture";
import type { LaptopRig } from "./rig";

interface LaptopModelProps {
  rig: React.RefObject<LaptopRig>;
  quality?: "high" | "low";
  onTrackpadHover?: (hovering: boolean) => void;
}

const BASE_W = 3.0;
const BASE_D = 2.1;
const BASE_T = 0.13;
const LID_W = 3.0;
const LID_H = 2.05;

const COLS = 14;
const ROWS = 5;
const KEY_PITCH_X = 0.166;
const KEY_PITCH_Z = 0.152;

export function LaptopModel({ rig, quality = "high", onTrackpadHover }: LaptopModelProps) {
  const displayRef = useRef<THREE.Group>(null);
  const screenMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const keysRef = useRef<THREE.InstancedMesh>(null);
  const trackpadMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const keyboardPadRef = useRef<THREE.Mesh>(null);

  // smoothed actuals (chase the rig targets)
  const state = useRef({ lid: rig.current?.lid ?? 0, screenOn: 0, glow: 0 });
  const ripple = useRef({ x: 0, z: 0, active: false });

  const logoTexture = useMemo(() => createLogoTexture(), []);
  const screen = useMemo(() => createScreenTexture(), []);

  const keyPositions = useMemo(() => {
    const pts: { x: number; z: number }[] = [];
    const wellCenterZ = -0.12;
    for (let r = 0; r < ROWS; r++) {
      const rowInset = r * 0.045;
      for (let c = 0; c < COLS; c++) {
        pts.push({
          x: (c - (COLS - 1) / 2) * KEY_PITCH_X,
          z: wellCenterZ + (r - (ROWS - 1) / 2) * KEY_PITCH_Z + rowInset * 0,
        });
      }
    }
    return pts;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // seed key matrices once
  useLayoutEffect(() => {
    const mesh = keysRef.current;
    if (!mesh) return;
    keyPositions.forEach((p, i) => {
      dummy.position.set(p.x, BASE_T + 0.016, p.z);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [dummy, keyPositions]);

  useEffect(() => () => screen.dispose(), [screen]);
  useEffect(() => () => logoTexture.dispose(), [logoTexture]);

  useFrame((_, delta) => {
    const target = rig.current;
    if (!target) return;
    const s = state.current;
    const k = Math.min(1, delta * 4.5);

    s.lid += (target.lid - s.lid) * k;
    s.screenOn += (target.screenOn - s.screenOn) * k * 1.4;
    s.glow += (target.glow - s.glow) * k;

    // Hinge: closed = flat over base (+90°), fully open ≈ −22°
    if (displayRef.current) {
      displayRef.current.rotation.x =
        Math.PI / 2 - THREE.MathUtils.degToRad(s.lid);
    }

    if (screenMatRef.current) {
      const v = 0.07 + 0.93 * s.screenOn;
      screenMatRef.current.color.setScalar(v);
    }

    if (trackpadMatRef.current) {
      trackpadMatRef.current.emissiveIntensity = s.glow * 0.5;
    }

    // Keyboard ripple / backlight
    const mesh = keysRef.current;
    if (mesh) {
      keyPositions.forEach((p, i) => {
        let rise = 0;
        if (ripple.current.active || s.glow > 0.02) {
          const dx = p.x - ripple.current.x;
          const dz = p.z - ripple.current.z;
          const dist = Math.sqrt(dx * dx + dz * dz);
          const influence = ripple.current.active
            ? Math.max(0, 1 - dist / 0.42)
            : 0;
          rise = influence * influence * 0.022 + s.glow * 0.004;
        }
        dummy.position.set(p.x, BASE_T + 0.016 + rise, p.z);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
    }
  });

  const onKeysMove = (e: ThreeEvent<PointerEvent>) => {
    const local = keyboardPadRef.current?.worldToLocal(e.point.clone());
    if (!local) return;
    ripple.current.x = local.x;
    ripple.current.z = local.z;
    ripple.current.active = true;
  };

  return (
    <group>
      {/* ── BASE ── */}
      <RoundedBox
        args={[BASE_W, BASE_T, BASE_D]}
        radius={0.035}
        smoothness={quality === "high" ? 5 : 3}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#d9dbdf" metalness={0.85} roughness={0.32} />
      </RoundedBox>

      {/* Rubber feet */}
      {[
        [-1.32, -0.78],
        [1.32, -0.78],
        [-1.32, 0.78],
        [1.32, 0.78],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, -0.012, z]}>
          <cylinderGeometry args={[0.045, 0.05, 0.024, 12]} />
          <meshStandardMaterial color="#2a2c31" roughness={0.9} />
        </mesh>
      ))}

      {/* Side port slots */}
      {[[-1.487, 0.34], [-1.487, -0.06], [1.487, 0.34], [1.487, -0.06]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.065, z]}>
          <boxGeometry args={[0.02, 0.032, 0.22]} />
          <meshStandardMaterial color="#17181c" roughness={0.6} />
        </mesh>
      ))}

      {/* Keyboard well */}
      <mesh ref={keyboardPadRef} position={[0, BASE_T + 0.002, -0.12]} rotation={[-Math.PI / 2, 0, 0]}
        onPointerMove={quality === "high" ? onKeysMove : undefined}
        onPointerOut={() => (ripple.current.active = false)}
      >
        <planeGeometry args={[2.46, 0.88]} />
        <meshStandardMaterial color="#1d1f24" roughness={0.5} metalness={0.25} transparent opacity={0} />
      </mesh>
      <mesh position={[0, BASE_T + 0.001, -0.12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.52, 0.94]} />
        <meshStandardMaterial color="#22242a" roughness={0.55} metalness={0.2} />
      </mesh>

      {/* Keycaps (instanced) */}
      <instancedMesh
        ref={keysRef}
        args={[undefined, undefined, COLS * ROWS]}
        castShadow={false}
        receiveShadow={false}
      >
        <boxGeometry args={[0.148, 0.022, 0.128]} />
        <meshStandardMaterial
          color="#26282e"
          roughness={0.55}
          metalness={0.15}
          emissive="#7ea2ff"
          emissiveIntensity={0.12}
        />
      </instancedMesh>

      {/* Trackpad */}
      <RoundedBox
        args={[1.06, 0.012, 0.62]}
        radius={0.02}
        smoothness={3}
        position={[0, BASE_T + 0.004, 0.68]}
        onPointerOver={() => onTrackpadHover?.(true)}
        onPointerOut={() => onTrackpadHover?.(false)}
      >
        <meshStandardMaterial
          ref={trackpadMatRef}
          color="#ccd0d6"
          roughness={0.38}
          metalness={0.4}
          emissive="#2b50ff"
          emissiveIntensity={0}
        />
      </RoundedBox>

      {/* ── HINGES ── */}
      {[-1.02, 1.02].map((x) => (
        <mesh key={x} position={[x, BASE_T - 0.02, -BASE_D / 2 + 0.04]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.52, 20]} />
          <meshStandardMaterial color="#8f939a" metalness={0.9} roughness={0.36} />
        </mesh>
      ))}

      {/* ── DISPLAY (pivots at hinge line) ── */}
      <group ref={displayRef} position={[0, BASE_T - 0.02, -BASE_D / 2 + 0.04]}>
        {/* Lid shell */}
        <RoundedBox
          args={[LID_W, LID_H, 0.07]}
          radius={0.03}
          smoothness={quality === "high" ? 5 : 3}
          position={[0, LID_H / 2, 0]}
          castShadow
        >
          <meshStandardMaterial color="#dcdee2" metalness={0.85} roughness={0.3} />
        </RoundedBox>

        {/* Inner bezel */}
        <mesh position={[0, LID_H / 2, 0.0365]}>
          <planeGeometry args={[LID_W - 0.08, LID_H - 0.08]} />
          <meshStandardMaterial color="#141519" roughness={0.42} metalness={0.3} />
        </mesh>

        {/* Live screen */}
        <mesh position={[0, LID_H / 2 + 0.015, 0.0375]}>
          <planeGeometry args={[LID_W - 0.2, LID_H - 0.24]} />
          <meshBasicMaterial
            ref={screenMatRef}
            map={screen.texture}
            toneMapped={false}
            color="#000000"
          />
        </mesh>

        {/* Camera dot */}
        <mesh position={[0, LID_H - 0.035, 0.037]}>
          <circleGeometry args={[0.008, 10]} />
          <meshBasicMaterial color="#3a3f4a" />
        </mesh>

        {/* MR badge — outer face */}
        <mesh position={[0, LID_H / 2, -0.0365]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.11, 28]} />
          <meshBasicMaterial map={logoTexture} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
