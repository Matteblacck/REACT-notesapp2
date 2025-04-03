export default function Header() {
  return (
    <div className="container">
      <div className="mt-2 d-flex align-items-center justify-content-between">
        <div>
          <h1 style={{ fontSize: "40px", fontWeight: "900" }}>notes.</h1>
        </div>
        <div className="d-flex flex-column">
          <div>
            <h3 className="align-self-center">by matteblack</h3>
          </div>
        </div>
      </div>
    </div>
  );
}