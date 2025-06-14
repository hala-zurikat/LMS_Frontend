export default function Button({ children, onClick, type = "button" }) {
  return (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  );
}
