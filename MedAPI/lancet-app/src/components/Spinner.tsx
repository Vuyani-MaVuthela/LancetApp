import { ClipLoader } from "react-spinners";

const overrideCss = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({ loading }: any) => {
  return (
    <ClipLoader
      color="#4338ca"
      loading={loading}
      cssOverride={overrideCss}
      size={150}
    />
  );
};

export default Spinner;
