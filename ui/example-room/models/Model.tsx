import { Clone, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Model() {
  const { scene }: any = useGLTF(`/models/room-of-final.glb`);

  const notePad: THREE.Mesh = scene.children.find(
    (child: THREE.Object3D) => child.name === "Legal_Note_Pad_White"
  );

  notePad.visible = false;
  const bakedTexture = useTexture(`/models/final2.jpg`);
  bakedTexture.flipY = false;

  return (
    <Clone
      position={[0, 0, 30]}
      inject={<meshBasicMaterial map={bakedTexture} />}
      receiveShadow={true}
      object={scene}
    />
  );
}
