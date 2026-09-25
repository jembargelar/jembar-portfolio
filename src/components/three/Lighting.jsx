export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} />
      <pointLight position={[-5, -3, -4]} intensity={0.7} color="#7c3aed" />
      <pointLight position={[5, 3, 3]} intensity={0.5} color="#06b6d4" />
    </>
  );
}
