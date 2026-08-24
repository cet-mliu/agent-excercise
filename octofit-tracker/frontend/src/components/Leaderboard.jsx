import DataTable from './DataTable'

export default function Leaderboard() {
  return <DataTable endpoint="/api/leaderboard/" title="Leaderboard" />
}
