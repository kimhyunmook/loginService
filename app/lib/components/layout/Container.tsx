type ContainerT = {
  style: React.CSSProperties;
  children: React.ReactNode;
};
export default function Container({ style, children }: ContainerT) {
  return (
    <div id="Container" style={style}>
      {children}
    </div>
  );
}
