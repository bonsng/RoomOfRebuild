import { useThree } from "@react-three/fiber";
import { Angle } from "@/util/data/angles";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { OrbitControls } from "@react-three/drei";
import { OrbitControls as OrbitControlsImpl} from 'three-stdlib'

const CameraControls = ({ position, target }: Angle) => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const ref = useRef<OrbitControlsImpl | null>(null);

  const cameraAnimate = useCallback(() => {
    if (ref.current) {
      gsap.timeline().to(camera.position, {
        duration: 1.5,
        repeat: 0,
        x: position.x,
        y: position.y,
        z: position.z,
        ease: "power3.inOut",
      });

      gsap.timeline().to(
        ref.current.target,
        {
          duration: 1.5,
          repeat: 0,
          x: target.x,
          y: target.y,
          z: target.z,
          ease: "power3.inOut",
        },
        "<"
      );
    }
  }, [camera.position, position, target]);

  useEffect(() => {
    cameraAnimate();
  }, [cameraAnimate]);

  return (
    <OrbitControls
      enableZoom={false}
      enableRotate={false}
      ref={ref}
      args={[camera, domElement]}
      target={[0, 11, -10]}
    />
  );
};

export default CameraControls;
