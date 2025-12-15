/* eslint-disable @next/next/no-img-element */
import Container from "../component/Container";

function Property() {
  return (
    <Container>
      <h1>Property</h1>
      <div className="grid grid-cols-4 gap-4 py-4">
        <div>
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUQBFOHZSZnhLVzERujyhcGmJ5s78fJtsG9Q&s"
            }
            alt=""
          ></img>

          <div className="shadow-md">
            <h3>Title</h3>
            <p>
              Price: <span>$150000000</span>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Property;
