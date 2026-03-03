import { Clone, useGLTF, useTexture } from "@react-three/drei";
import { useMemo } from "react";

export default function Model() {
  const { scene }: any = useGLTF(`/models/room-of-final.glb`);
  const bakedTexture = useTexture(`/models/final2.jpg`);

  const preparedScene = useMemo(() => {
    const notePad = scene.children.find(
      (child: any) => child.name === "Legal_Note_Pad_White",
    );
    notePad.visible = false;
    // eslint-disable-next-line react-hooks/immutability
    bakedTexture.flipY = false;
    return scene;
  }, [scene, bakedTexture]);

  return (
    <Clone
      position={[0, 0, 30]}
      inject={<meshBasicMaterial map={bakedTexture} />}
      receiveShadow={true}
      object={preparedScene}
    />
  );
}
