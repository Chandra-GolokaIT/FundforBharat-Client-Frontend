import React from "react";
import FundraiseForModal from "../../Components/FundraiseForComponents/FundraiseForModal";
import { useParams } from "react-router-dom";

const FundraiseForPage = () => {
  const { cause } = useParams();

  return (
    <div>
      <FundraiseForModal cause={cause} />
    </div>
  );
};

export default FundraiseForPage;
