import { Clone, Text, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Posit({
  position,
  text,
}: {
  position: number[];
  text: string;
}) {
  const { scene }: any = useGLTF(`/models/postit.glb`);
  const postitTexture = useTexture(`/models/postit-diffuse.jpg`);
  const postitTextureNormal = useTexture(`/models/postit-normal.jpg`);
  const postitTextureRoughness = useTexture(`/models/postit-roughness.jpg`);

  postitTexture.flipY = false;
  postitTexture.colorSpace = THREE.SRGBColorSpace;

  const postitMaterial = new THREE.MeshStandardMaterial({
    map: postitTexture,
    roughnessMap: postitTextureRoughness,
    normalMap: postitTextureNormal,
    transparent: true,
  });

  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material = postitMaterial;
      child.castShadow = true;
    }
  });

  return (
    <>
      <Clone position={[-0.2, position[0], 30 + position[1]]} object={scene} />
      <Text
        position={[27, position[0] + 13.8, position[1] + 9.4]}
        rotation-y={-Math.PI * 0.5}
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
        maxWidth={0.9}
      >
        {text.length > 20 ? `${text.slice(0, 20)}...` : text}
      </Text>
    </>
  );
}
