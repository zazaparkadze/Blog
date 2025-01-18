export default function Header({title, numberOfPosts}) {
    return (
      <div className="Header">
        <h2>{title}</h2>
        <h2 style={{ color: numberOfPosts < 10 ? "red" : "green" }}>{numberOfPosts} { numberOfPosts == 1 ? "post" : "posts"}</h2>
      </div>
    )
  }