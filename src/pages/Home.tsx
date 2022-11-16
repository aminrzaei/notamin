import { useSelector, useDispatch } from "react-redux";

const Home: React.FC = () => {
  const count = useSelector((state) => console.log(state));
  const dispatch = useDispatch();
  return <>Home</>;
};

export default Home;
