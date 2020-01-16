import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import classNames from "classnames";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const LAUNCHES_QUERY = gql`
  {
    launches {
      mission_name
      launch_success
      launch_date_local
      flight_number
    }
  }
`;

export default class Launchers extends Component {
  render() {
    return (
        <Fragment>
        <h1 className="mt-2">Missions</h1>
        <hr/>
      <div className="launches container card p-3 my-4">
        <Query query={LAUNCHES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h1>Loading..</h1>;
            else {
              if (!error) {
                console.log(data);
                return this.showData(data);
              } else return "error";
            }
          }}
        </Query>
      </div></Fragment>
    );
  }

  showData = data =>
    data.launches.map((launch, index) =>
      index < data.launches.length ? (
        <li
          className="list-group-item list-group-item bg-light my-1 py-2 pr-4 pl-3 clearfix"
          key={index}
        >
          <h5
            className={classNames({
              "text-success": launch.launch_success,
              "text-danger": !launch.launch_success
            })}
          >
            {index + 1}. {launch.mission_name}
          </h5>
          <p className="d-inline-block">
            Date:{" "}
            <Moment format="DD-MM-YYYY HH:mm">
              {launch.launch_date_local}
            </Moment>
          </p>
          <Link
            to={`/details/${launch.flight_number}`}
            mission={launch}
            className="btn-warning btn float-right btn-sm "
          >
            More Info
          </Link>
        </li>
      ) : null
    );
}
