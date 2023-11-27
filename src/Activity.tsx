interface Activity {
  activity: string;
  description: string;
  start: string;
  end: string;
  order: number;
  id: number;
}

interface Props {
  activity: Activity;
  deleteActivity: (id: number) => void;
}

const ActivityComponent = ({ activity, deleteActivity }: Props) => {
  return (
    <div className="activity-and-deletion">
      <div className="activity">
        <div className="activity-time-left activity-time">
          <label>
            Start<p>{activity.start}</p>
          </label>
        </div>

        <div className="routine-activity-content">
          <h2 className="activity-heading">{activity.activity}</h2>
          <p className="activity-description">{activity.description}</p>
        </div>

        <div className="activity-time-right activity-time">
          <label className="activity-time-label activity-time-label-right">
            End<p>{activity.end}</p>
          </label>
        </div>
      </div>
      <button
        className="delete-actity-button"
        onClick={() => deleteActivity(activity.id)}
      >
        ✖
      </button>
    </div>
  );
};

export default ActivityComponent;
