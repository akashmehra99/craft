import { FC, useEffect, useState } from "react";

interface TrendsProps {
  trends: any;
}
const Trends: FC<TrendsProps> = (props: TrendsProps) => {
  const [trends, setTrends] = useState([]);
  useEffect(() => {
    setTrends(props.trends);
  }, [props.trends]);
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
              <div className="accoutDetails">
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
