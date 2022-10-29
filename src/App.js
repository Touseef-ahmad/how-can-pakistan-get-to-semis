import './App.css';
import { simulate, AllTeams, getLogs } from './simulator';

export default function App() {

  const pointsTable = simulate();
  const logs = getLogs();

  return (
    <div class="overflow-x-auto relative">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" class="py-3 px-6">
                      Team
                  </th>
                  <th scope="col" class="py-3 px-6">
                      Matches
                  </th>
                  <th scope="col" class="py-3 px-6">
                      Won
                  </th>
                  <th scope="col" class="py-3 px-6">
                      Lost
                  </th>
                  <th scope="col" class="py-3 px-6">
                      Draw
                  </th>
              </tr>
          </thead>
        {AllTeams.map(Element => {
          const {team, matchesPlayed, won, lost, draw} = pointsTable[Element];
          return <tr class="bg-white dark:bg-gray-800">
            <td class="py-4 px-6">{team}</td>
            <td class="py-4 px-6">{matchesPlayed}</td>
            <td class="py-4 px-6">{won}</td>
            <td class="py-4 px-6">{lost}</td>
            <td class="py-4 px-6">{draw}</td>
          </tr>
      })}
      </table>
      <h1>Simulator logs</h1>
      <div class='bg-black'>{logs.map(log => (
        <p class='text-white'>{log}</p>
      ))}</div>
    </div>
  )
}