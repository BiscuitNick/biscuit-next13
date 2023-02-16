export interface ContextBarProps {
  show: boolean;
  children: any;
}

const ContextBar = (props: ContextBarProps) => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        display: "grid",
        bottom: 0,
      }}
    >
      <div
        style={{
          background: `  linear-gradient(115deg, blue, purple, orange) `,

          padding: 10,
          borderRadius: 10,
          margin: "auto",
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default ContextBar;
