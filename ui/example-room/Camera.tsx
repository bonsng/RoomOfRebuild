import { useThree } from "@react-three/fiber";
import { Angle } from "@/util/data/angles";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { OrbitControls } from "@react-three/drei";

const CameraControls = ({ position, target }: Angle) => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const ref = useRef<any>(null);

  function cameraAnimate(): void {
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
  }

  useEffect(() => {
    cameraAnimate();
  }, [target, position]);

  return (
    <OrbitControls
      // enableZoom={false}
      // enableRotate={false}
      ref={ref}
      args={[camera, domElement]}
      target={[0, 11, -10]}
    />
  );
};

export default CameraControls;
