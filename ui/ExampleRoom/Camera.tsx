import { useThree } from "@react-three/fiber";
import { Angle } from "./angles";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { OrbitControls } from "@react-three/drei";

const CameraControls = ({ position, target }: Angle) => {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  const ref = useRef<any>(null);

  //   useEffect(() => {
  //     if (ref.current) {
  //       console.log(ref.current);
  //       ref.current.target = target;
  //     }
  //   }, []);

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
      enableZoom={false}
      enableRotate={false}
      ref={ref}
      args={[camera, domElement]}
    />
  );
};

export default CameraControls;
