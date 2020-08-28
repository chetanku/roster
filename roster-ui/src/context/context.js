import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { appConfig } from "../config.js";

export const Ec2Context = React.createContext();
export const RdsContext = React.createContext();
export const ElbContext = React.createContext();
export const EmrContext = React.createContext();
export const MskContext = React.createContext();
export const RegionsContext = React.createContext();
export const SubnetsContext = React.createContext();
export const AccountContext = React.createContext();
export const DashboardContext = React.createContext();
export const CeContext = React.createContext();

const region = localStorage.getItem("region");
const awsbaseURL = appConfig.awsbaseURL || "http://localhost:5000/api/aws/";

// async function getlocation() {
//   return await axios.get("https://geolocation-db.com/json/");
// }

export const Ec2Provider = (props) => {
  const [ec2, setEc2] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    async function getEc2() {
      try {
        const result = await axios.get(awsbaseURL + "ec2", {
          params: {
            region: region,
          },
        });

        setEc2(result.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    getEc2();
  }, []);
  return (
    <Ec2Context.Provider
      value={{
        data: [ec2, setEc2],
        loading: [Loading, setLoading],
      }}
    >
      {props.children}{" "}
    </Ec2Context.Provider>
  );
};

export const RdsProvider = (props) => {
  const [Rds, setRds] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    async function getRds() {
      //setLoading(true);
      try {
        const result = await axios.get(awsbaseURL + "rds", {
          params: {
            region: region,
          },
        });
        setRds(result.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    getRds();
  }, []);
  return (
    <RdsContext.Provider
      value={{
        data: [Rds, setRds],
        loading: [Loading, setLoading],
      }}
    >
      {" "}
      {props.children}{" "}
    </RdsContext.Provider>
  );
};

export const ElbProvider = (props) => {
  const [Elb, setElb] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    async function getElb() {
      try {
        const result = await axios.get(awsbaseURL + "ec2/elb", {
          params: {
            region: region,
          },
        });
        setElb(result.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    getElb();
  }, []);
  return (
    <ElbContext.Provider
      value={{
        data: [Elb, setElb],
        loading: [Loading, setLoading],
      }}
    >
      {" "}
      {props.children}{" "}
    </ElbContext.Provider>
  );
};

export const EmrProvider = (props) => {
  const [Emr, setEmr] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    async function getEmr() {
      try {
        const result = await axios.get(awsbaseURL + "emr", {
          params: {
            region: region,
          },
        });
        setEmr(result.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    getEmr();
  }, []);
  return (
    <EmrContext.Provider
      value={{
        data: [Emr, setEmr],
        loading: [Loading, setLoading],
      }}
    >
      {" "}
      {props.children}{" "}
    </EmrContext.Provider>
  );
};

export const MskProvider = (props) => {
  const [Msk, setMsk] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    async function getMsk() {
      try {
        const result = await axios.get(awsbaseURL + "msk", {
          params: {
            region: region,
          },
        });
        setMsk(result.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    getMsk();
  }, []);
  return (
    <MskContext.Provider
      value={{
        data: [Msk, setMsk],
        loading: [Loading, setLoading],
      }}
    >
      {" "}
      {props.children}{" "}
    </MskContext.Provider>
  );
};

export const RegionsProvider = (props) => {
  const [Regions, setRegions] = useState([]);
  // window.navigator.geolocation.getCurrentPosition(console.log, console.log);
  localStorage.getItem("region") || localStorage.setItem("region", "us-east-2");
  useEffect(() => {
    // const CancelToken = axios.CancelToken;
    // const source = CancelToken.source();
    async function getRegions() {
      const result = await axios.get(awsbaseURL + "ec2/regions", {
        params: {
          region: region,
        },
      });
      setRegions(result.data.Regions);
    }
    getRegions();
  }, []);
  return (
    <RegionsContext.Provider value={[Regions, setRegions]}>
      {" "}
      {props.children}{" "}
    </RegionsContext.Provider>
  );
};

export const SubnetsProvider = (props) => {
  const [Subnets, setSubnets] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    // const CancelToken = axios.CancelToken;
    // const source = CancelToken.source();
    async function getSubnets() {
      try {
        const result = await axios.get(awsbaseURL + "ec2/subnets", {
          params: {
            region: region,
          },
        });

        setSubnets(result.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    getSubnets();
  }, []);
  return (
    <SubnetsContext.Provider
      value={{
        data: [Subnets, setSubnets],
        loading: [Loading, setLoading],
      }}
    >
      {" "}
      {props.children}{" "}
    </SubnetsContext.Provider>
  );
};

export const CeProvider = (props) => {
  const firstDay =
    localStorage.getItem("firstDay") ||
    moment.utc().startOf("month").format("YYYY-MM-DD");
  const lastDay =
    localStorage.getItem("lastDay") ||
    moment.utc().endOf("month").format("YYYY-MM-DD");
  const creds = sessionStorage.getItem("creds") || null;
  const [Ce, setCe] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCe() {
      try {
        const result = await axios.get(awsbaseURL + "ce", {
          params: {
            firstDay: firstDay,
            lastDay: lastDay,
            creds: creds,
          },
        });

        setCe(result.data);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    }
    getCe();
  }, []);

  let tomorrow = moment.utc().add(1, "days").format("YYYY-MM-DD");
  let firstDayofNextMonth = moment
    .utc()
    .add(2, "months")
    .startOf("month")
    .format("YYYY-MM-DD");
  const [CeForecast, setCeForecast] = useState([]);

  useEffect(() => {
    async function getCe() {
      try {
        const result = await axios.get(awsbaseURL + "ce/forecast", {
          params: {
            firstDay: tomorrow,
            lastDay: firstDayofNextMonth,
            creds: creds,
          },
        });
        setCeForecast(result.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
    getCe();
  }, []);
  return (
    <CeContext.Provider
      value={{
        data: [Ce, setCe],
        data_forecast: [CeForecast, setCeForecast],
        loading: [Loading, setLoading],
      }}
    >
      {" "}
      {props.children}{" "}
    </CeContext.Provider>
  );
};

export const DashboardProvider = (props) => {
  const [Alarms, setAlarms] = useState([]);
  const [Metrics, setMetrics] = useState([]);
  const [rdsMetrics, setrdsMetrics] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    async function getDashboard() {
      try {
        const result = await axios.get(awsbaseURL + "cloudwatch/alarms", {
          params: {
            region: region,
          },
        });

        setAlarms(result.data);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
    getDashboard();
  }, []);

  useEffect(() => {
    async function getMetricWidget() {
      try {
        const result = await axios.get(awsbaseURL + "cloudwatch/metrics/ec2", {
          params: {
            region: region,
          },
        });
        setMetrics(result.data);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
    getMetricWidget();
  }, []);

  useEffect(() => {
    async function getMetricWidgetRds() {
      try {
        const result = await axios.get(awsbaseURL + "cloudwatch/metrics/rds", {
          params: {
            region: region,
          },
        });
        setrdsMetrics(result.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
    getMetricWidgetRds();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        data: [Alarms, setAlarms],
        metricsData: [Metrics, setMetrics],
        rdsMetricsData: [rdsMetrics, setrdsMetrics],
        loading: [Loading, setLoading],
      }}
    >
      {" "}
      {props.children}{" "}
    </DashboardContext.Provider>
  );
};

export const AccountProvider = (props) => {
  const [Account, setAccount] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAccount() {
      try {
        const result = await axios.get(awsbaseURL + "account");

        setAccount(result.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    getAccount();
  }, []);
  return (
    <AccountContext.Provider
      value={{
        data: [Account, setAccount],
        loading: [Loading, setLoading],
      }}
    >
      {props.children}{" "}
    </AccountContext.Provider>
  );
};
