import R from 'ramda';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

import parameters from 'queryparams';

window.parameters = parameters;

import ordinalize from './lib/ordinalize';

const DOM = {
  app: document.getElementById('app'),
};

const monthClass = m =>
  m.month() % 2 ? 'month--odd' : 'month--even';

export default () => {
  const { year } = parameters({
    year: 2017,
  });

  const thisYear = Array.from(moment.range(`${year}-01-01`, `${year}-12-31`).by('day'));
  const shiftOver = thisYear[0].weekday();
  const paddedDays = Array.from(moment.range(`${year - 1}-12-${31 - (shiftOver - 1)}`, `${year - 1}-12-31`).by('day'));
  const days = paddedDays.concat(thisYear);
  const months = R.dropLast(1, R.splitEvery(28, days)).map(month => R.splitEvery(7, month));

  DOM.app.innerHTML = `
    <div class='calendar'>
      <div class='calendar__header'>
        <h1>KODAK COMPANY</h1>
        <h2>${year} FACTORY CALENDAR</h2>
      </div>
      <div class='calendar__periods'>
        ${months.map((month, i) => `
          <div class='period'>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th colspan='7'>
                    ${ordinalize(i + 1)} <span>Period</span>
                  </th>
                </tr>
                <tr>
                  <th></th>
                  <th>S</th>
                  <th>M</th>
                  <th>T</th>
                  <th>W</th>
                  <th>T</th>
                  <th>F</th>
                  <th>S</th>
                </tr>
              </thead>
              <tbody>
                ${month.map((week, i) => {
                  let prev = month[i - 1];
                  let label = week[0].format('MMM');

                  return `
                    <tr>
                      <td class='day ${monthClass(week[0])}'>
                        <span>
                          ${i === 0 || prev && prev[0].format('MMM') !== label ? `${label}.` : ''}
                        </span>
                      </td>
                      ${week.map(day => `
                        <td class='day ${monthClass(day)}'>
                          ${day.format('D')}
                        </td>
                      `).join('')}
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};
