"use client";

import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";

interface MarkerProps extends React.ComponentProps<typeof Html> {
  children: React.ReactNode;
}

const Marker: React.FC<MarkerProps> = ({ children, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50);

    return () => {
      setIsVisible(false);
    };
  }, []);
  return (
    <Html
      transform
      distanceFactor={9}
      castShadow={false}
      receiveShadow={false}
      {...props}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `scale(${isVisible ? 1 : 0.7})`,
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
      }}
    >
      <div className="text-white border-1 border-solid border-white rounded-md py-1 px-2 font-extralight">
        {children}
      </div>
    </Html>
  );
};

export default Marker;

// const Marker: React.FC<MarkerProps> = ({ view, children, ...props }) => {
//   const ref = useRef<THREE.MeshBasicMaterial>(null);
//   const [isHover, setIsHover] = useState<boolean>(false);
//   const { state } = useCameraViewState();

//   useFrame((s) => {
//     if (ref.current) ref.current.opacity = Math.sin(s.clock.elapsedTime * 2);
//   });

//   return (
//     <group>
//       <mesh
//         onPointerOver={() => setIsHover(true)}
//         onPointerOut={() => setIsHover(false)}
//         visible={state.view === view}
//         scale={0.3}
//         position={[24, 6.8, 10]}
//       >
//         <sphereGeometry />
//         <meshBasicMaterial
//           ref={ref}
//           transparent
//           opacity={0.1}
//           color={new THREE.Color("#982020")}
//         />
//       </mesh>
//       {isHover && (
//         <Html
//           transform
//           style={{
//             transition: "all 0.2s",
//             opacity: isHover ? 1 : 0,
//             transform: `scale(${isHover ? 1 : 0.25})`,
//           }}
//           {...props}
//         >
//           {children}
//         </Html>
//       )}
//     </group>
//   );
// };
// export default Marker;
