import { images } from "@/util/data/images";
import { Image } from "@react-three/drei";
import { useRef, useState } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";

const GOLDENRATIO = 1.61803398875;

export default function PhotoAlbum() {
  return (
    <group position={[-27.3, 10, 10]} rotation={[0, Math.PI / 2, 0]}>
      <Frames />
    </group>
  );
}

const Frames = () => {
  // const { openModal } = useModal("PhotoAlbum");
  return (
    <group
      // onClick={(e) => {
      //   e.stopPropagation();
      //   window.open("/example-room/photo-gallery", "_blank");
      // }}
    >
      {images.map((props, idx) => (
        <Frame key={idx} {...props} />
      ))}
    </group>
  );
};

const Frame = ({ url, ...props }: { url: string }) => {
  const image = useRef<any>(null);
  const frame = useRef<any>(null);
  const [hovered, hover] = useState(false);
  const [rnd] = useState(() => Math.random());

  useFrame((state, dt) => {
    if (image.current) {
      image.current.material.zoom =
        2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
      easing.damp3(
        image.current.scale,
        [0.85 * (hovered ? 0.85 : 1), 0.9 * (hovered ? 0.905 : 1), 1],
        0.1,
        dt
      );
      easing.dampC(
        frame.current.material.color,
        hovered ? "orange" : "white",
        0.1,
        dt
      );
    }
  });

  return (
    <group {...props}>
      <mesh
        castShadow
        scale={[3, GOLDENRATIO * 2.5, 0.3]}
        position={[0, (GOLDENRATIO / 2) * 2.5, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          hover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          hover(false);
          document.body.style.cursor = "default";
        }}
      >
        <boxGeometry />
        <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.9} />
        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={true} />
        </mesh>
        <Image
            alt={`image${url}`}
          raycast={() => null}
          ref={image}
          position={[0, 0, 0.8]}
          url={url}
        />
      </mesh>
    </group>
  );
};
