import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import {
  Ec2Provider,
  RdsProvider,
  ElbProvider,
  EmrProvider,
  MskProvider,
  SubnetsProvider,
  CeProvider,
  DashboardProvider,
} from "./context/context.js";
import Sidebar from "./components/sidebar";
import Navbars from "./components/navbar";
import Ec2 from "./components/aws/ec2";
import Elb from "./components/aws/elb";
import Rds from "./components/aws/rds";
import Emr from "./components/aws/emr";
import Msk from "./components/aws/msk";
import Subnets from "./components/aws/subnets";
import Ce from "./components/aws/costsummary";
import Dashboard from "./components/dashboard";

import "rsuite/dist/styles/rsuite-default.min.css";

const App = () => {
  return (
    <>
      <React.Fragment>
        <Sidebar />
        <Navbars />
        {/* <AccountProvider>
          <Account></Account>
        </AccountProvider>
        <RegionsProvider>
          <Awsregions> </Awsregions>{" "}
        </RegionsProvider>{" "} */}
        <Route
          exact
          path="/ec2"
          render={() => (
            <Ec2Provider>
              <Ec2 />
            </Ec2Provider>
          )}
        />{" "}
        <Route
          exact
          path="/elb"
          render={() => (
            <ElbProvider>
              <Elb />
            </ElbProvider>
          )}
        />{" "}
        <Route
          path="/rds"
          render={() => (
            <RdsProvider>
              <Rds />
            </RdsProvider>
          )}
          exact
        />
        <Route
          path="/emr"
          render={() => (
            <EmrProvider>
              <Emr />
            </EmrProvider>
          )}
          exact
        />
        <Route
          path="/msk"
          render={() => (
            <MskProvider>
              <Msk />
            </MskProvider>
          )}
          exact
        />
        <Route
          path="/subnets"
          render={() => (
            <SubnetsProvider>
              <Subnets />
            </SubnetsProvider>
          )}
          exact
        />
        <Route
          path="/ce"
          render={() => (
            <CeProvider>
              <Ce />
            </CeProvider>
          )}
          exact
        />{" "}
        <Route
          path="/"
          render={() => (
            <DashboardProvider>
              <Dashboard />
            </DashboardProvider>
          )}
          exact
        />
        {/* <div className="footer copyright text-center text-muted">
          <h1 className="h5 text-muted">©2020 Chetan Yanamandra</h1>
        </div> */}
      </React.Fragment>
    </>
  );
};

export default App;
