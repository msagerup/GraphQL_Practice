import React from 'react';
import classNames from 'classnames';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

function LaunchItem(props) {
  const {
    flight_number,
    mission_name,
    launch_year,
    launch_date_local,
    launch_success
  } = props.launch;

  return (
    <div className='card card-body mb-3'>
      <div className='row'>
        <div className='col-md-9'>
          <h4>
            Mission:{' '}
            <span
              className={classNames({
                'text-success': launch_success,
                'text-danger': !launch_success
              })}
            >
              {mission_name}
            </span>
          </h4>
          <p>
            Date: <Moment format='YYYY-MM-DD HH:mm'>{launch_date_local}</Moment>
          </p>
          <p>
            Mission Success:{' '}
            <span
              className={classNames({
                'text-success': launch_success,
                'text-danger': !launch_success
              })}
            >
              {launch_success ? 'Successful' : 'Failed'}
            </span>
          </p>
        </div>
        <div className='col-md-3'>
          <Link to={`/launch/${flight_number}`} className='btn btn-primary'>
            Launch Details
          </Link>
        </div>
      </div>
    </div>
  );
}
export default LaunchItem;
