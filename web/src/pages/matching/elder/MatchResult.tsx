import { Match } from "../../../types";

export default function MatchResult({ match }: { match: Match }) {
  return (
    <div>
      <ul>
        {match.users.map(({ id, name }, i) => (
          <li key={`${id}-${i}`}>
            {id}, {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
