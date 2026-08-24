"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { LaptopModel } from "./LaptopModel";
import { createRig, type LaptopRig } from "./rig";
import { useActiveWhenVisible, useEverInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type Mode = "hero" | "showcase";

interface LaptopStageProps {
  mode?: Mode;
  className?: string;
  /** external rig — lets sections drive lid/screen/glow */
  rigRef?: React.RefObject<LaptopRig>;
  /** run the built-in load choreography (disable when a section drives the rig itself) */
  autoIntro?: boolean;
  onTrackpadHover?: (hovering: boolean) => void;
}

/* ── Intro choreography: appear → rise → lid opens → screen wakes ── */
function useIntro(rigRef: React.RefObject<LaptopRig>, mode: Mode, enabled: boolean) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!enabled) return;
    if (!rigRef.current) rigRef.current = createRig();

    if (mode === "showcase") {
      Object.assign(rigRef.current, { lid: 104, screenOn: 1, glow: 0.45, intro: 1 });
      return;
    }

    if (reducedMotion) {
      Object.assign(rigRef.current, { intro: 1, lid: 100, screenOn: 1, glow: 0.4 });
      return;
    }

    Object.assign(rigRef.current, { intro: 0, lid: 0, screenOn: 0, glow: 0 });
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
    tl.to(rigRef.current, { intro: 1, duration: 2.1 }, 0)
      .to(rigRef.current, { lid: 106, duration: 1.75, ease: "power3.inOut" }, 0.5)
      .to(rigRef.current, { screenOn: 1, duration: 0.85 }, 1.5)
      .to(rigRef.current, { glow: 0.4, duration: 0.7 }, 1.85);
    return () => {
      tl.kill();
    };
  }, [mode, enabled, reducedMotion, rigRef]);
}

function CameraRig({
  mode,
  rig,
}: {
  mode: Mode;
  rig: React.RefObject<LaptopRig>;
}) {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0, 0.72, 0));
  const desired = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    if (mode === "showcase") return;
    const k = Math.min(1, delta * 3);
    const i = rig.current?.intro ?? 0;
    const px = state.pointer.x;
    const py = state.pointer.y;

    desired.current.set(
      px * 0.34,
      THREE.MathUtils.lerp(2.5, 1.38, i) - py * 0.16,
      THREE.MathUtils.lerp(9.8, 6.15, i),
    );
    camera.position.lerp(desired.current, k);
    look.current.set(0, 0.72 + Math.sin(state.clock.elapsedTime * 0.5) * 0.008, 0);
    camera.lookAt(look.current);
  });
  return null;
}

/** Gentle post-intro life: micro yaw sway + vertical bob. */
function AmbientMotion({
  rig,
  enabled,
  children,
}: {
  rig: React.RefObject<LaptopRig>;
  enabled: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    const intro = rig.current?.intro ?? 0;
    const t = state.clock.elapsedTime;
    const k = Math.min(1, delta * 3);

    const targetY = enabled && intro > 0.85 ? state.pointer.x * 0.09 + Math.sin(t * 0.24) * 0.028 : 0;
    const targetX = enabled && intro > 0.85 ? -state.pointer.y * 0.045 : 0;
    g.rotation.y += (targetY - g.rotation.y) * k;
    g.rotation.x += (targetX - g.rotation.x) * k;
    g.position.y =
      enabled && intro > 0.85 ? Math.sin(t * 0.85) * 0.022 : THREE.MathUtils.lerp(-0.14, 0, intro);
  });

  return <group ref={ref}>{children}</group>;
}

export function LaptopStage({
  mode = "hero",
  className = "",
  rigRef,
  autoIntro = true,
  onTrackpadHover,
}: LaptopStageProps) {
  const internalRig = useRef<LaptopRig>(createRig());
  const rig = rigRef ?? internalRig;
  const { ref: wrapRef, active } = useActiveWhenVisible<HTMLDivElement>();
  const { ref: mountRef, seen } = useEverInView<HTMLDivElement>();
  const reducedMotion = useReducedMotion();

  useIntro(rig, mode, autoIntro);

  return (
    <div
      ref={(node) => {
        wrapRef.current = node;
        mountRef.current = node;
      }}
      className={`relative ${className}`}
      data-cursor="ROTATE"
    >
      {seen && (
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ fov: 30, near: 0.1, far: 60, position: [0, 2.5, 9.8] }}
        style={{ touchAction: mode === "showcase" ? "none" : "pan-y" }}
      >
        <ambientLight intensity={0.62} />
        <directionalLight position={[4.5, 6.5, 4]} intensity={1.15} />
        <directionalLight position={[-6, 3.5, -2.5]} intensity={0.4} color="#dfe6ff" />
        <directionalLight position={[0, 4, -7]} intensity={0.55} />

        <Environment resolution={256}>
          <Lightformer intensity={1.7} position={[0, 5, -3]} scale={[11, 5, 1]} color="#ffffff" />
          <Lightformer intensity={0.9} position={[-5.5, 1.5, 2.5]} rotation-y={Math.PI / 2} scale={[7, 2.5, 1]} color="#e9edff" />
          <Lightformer intensity={0.7} position={[5.5, 1, 3]} rotation-y={-Math.PI / 2} scale={[7, 2.5, 1]} color="#ffffff" />
          <Lightformer intensity={0.5} position={[0, -4, 2]} scale={[9, 3, 1]} color="#f3f4f6" />
        </Environment>

        <AmbientMotion rig={rig} enabled={!reducedMotion}>
          <LaptopModel rig={rig} onTrackpadHover={onTrackpadHover} />
        </AmbientMotion>

        <ContactShadows
          position={[0, -0.16, 0]}
          opacity={0.32}
          scale={11}
          blur={2.7}
          far={3.4}
          resolution={512}
          color="#232c48"
        />

        <CameraRig mode={mode} rig={rig} />

        {mode === "showcase" && (
          <OrbitControls
            makeDefault
            enablePan={false}
            enableZoom
            minDistance={4.4}
            maxDistance={8.5}
            minPolarAngle={0.95}
            maxPolarAngle={1.52}
            minAzimuthAngle={-1.15}
            maxAzimuthAngle={1.15}
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.65}
            target={[0, 0.72, 0]}
          />
        )}
      </Canvas>
      )}
    </div>
  );
}

export default LaptopStage;
