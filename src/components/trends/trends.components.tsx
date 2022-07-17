import { FC, useContext } from "react";

import { CraftContext } from "../../context/craft.context";
import { CraftContextType } from "../../@types/craft";
const Trends: FC = () => {
  const {trends} = useContext(CraftContext) as CraftContextType;
  return (
    <>
      {trends.length > 0 && (
        <div className="container">
          <div className="selectedAccount">Trends</div>
            <div className="accoutDetailsHeading">
                <div>Trend ID</div>
                <div>Name</div>
            </div>
            {trends.map((trend: any) => {
              return (
              <div key={trend.id} className="accoutDetails">
                <div>{trend.id}</div>
                <div>{trend.name}</div>
              </div>                
              );
            })}
        </div>
      )}
    </>
  );
};

export default Trends;
