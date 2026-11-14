import { escapeHTML as e } from '../../programming-logic/pseudocode-parser-and-diagrams.mjs?v=34';
import { additionalExamples } from './additional-normalisation-cases.mjs?v=34';
const D = (from, to, kind = 'full') => ({ from, to, kind });
const T = (name, key, attributes, dependencies, foreign = {}) => ({
  name,
  key,
  attributes,
  dependencies,
  foreign,
});
export const normalisationExamples = {
  orders: {
    title: 'Order lines: composite key',
    assumptions:
      'The only candidate key is (OrderID, ProductID). One product appears at most once per order. Each order has one date and customer; each customer has one current name. Product name and catalogue price depend only on ProductID. Quantity depends on the order-product pair. A price recorded at the time of sale would instead belong to the order line.',
    data: [
      {
        OrderID: 101,
        ProductID: 11,
        OrderDate: '2026-11-01',
        CustomerID: 1,
        CustomerName: 'Lebo',
        ProductName: 'Notebook',
        UnitPrice: 25,
        Quantity: 2,
      },
      {
        OrderID: 101,
        ProductID: 12,
        OrderDate: '2026-11-01',
        CustomerID: 1,
        CustomerName: 'Lebo',
        ProductName: 'Pen',
        UnitPrice: 10,
        Quantity: 1,
      },
      {
        OrderID: 102,
        ProductID: 11,
        OrderDate: '2026-11-02',
        CustomerID: 2,
        CustomerName: 'Naledi',
        ProductName: 'Notebook',
        UnitPrice: 25,
        Quantity: 3,
      },
    ],
    stages: {
      1: {
        explanation:
          'The relation has one value per cell and one row per order-product pair. The two underlined attributes together form the composite key. Partial dependencies and the customer-name transitive dependency remain.',
        tables: [
          T(
            'OrderLine',
            ['OrderID', 'ProductID'],
            [
              'OrderID',
              'ProductID',
              'OrderDate',
              'CustomerID',
              'CustomerName',
              'ProductName',
              'UnitPrice',
              'Quantity',
            ],
            [
              D(['OrderID', 'ProductID'], ['Quantity']),
              D(['OrderID'], ['OrderDate', 'CustomerID'], 'partial'),
              D(['ProductID'], ['ProductName', 'UnitPrice'], 'partial'),
              D(['CustomerID'], ['CustomerName'], 'transitive'),
            ],
          ),
        ],
      },
      2: {
        explanation:
          'Separate attributes that depend on OrderID alone or ProductID alone. Quantity stays with the complete line key. Orders is now in 2NF but CustomerID still determines CustomerName, so the order-to-customer-name transitive dependency remains.',
        tables: [
          T(
            'Orders',
            ['OrderID'],
            ['OrderID', 'OrderDate', 'CustomerID', 'CustomerName'],
            [
              D(['OrderID'], ['OrderDate', 'CustomerID']),
              D(['CustomerID'], ['CustomerName'], 'transitive'),
            ],
          ),
          T(
            'Products',
            ['ProductID'],
            ['ProductID', 'ProductName', 'UnitPrice'],
            [D(['ProductID'], ['ProductName', 'UnitPrice'])],
          ),
          T(
            'OrderLines',
            ['OrderID', 'ProductID'],
            ['OrderID', 'ProductID', 'Quantity'],
            [D(['OrderID', 'ProductID'], ['Quantity'])],
            { OrderID: 'Orders.OrderID', ProductID: 'Products.ProductID' },
          ),
        ],
      },
      3: {
        explanation:
          'Move CustomerName to Customers. Orders keeps CustomerID as a foreign key. Each remaining determinant in these tables is a key under the stated rules; no partial or non-key transitive dependency remains. Foreign keys preserve the connections for joins.',
        tables: [
          T(
            'Customers',
            ['CustomerID'],
            ['CustomerID', 'CustomerName'],
            [D(['CustomerID'], ['CustomerName'])],
          ),
          T(
            'Orders',
            ['OrderID'],
            ['OrderID', 'OrderDate', 'CustomerID'],
            [D(['OrderID'], ['OrderDate', 'CustomerID'])],
            { CustomerID: 'Customers.CustomerID' },
          ),
          T(
            'Products',
            ['ProductID'],
            ['ProductID', 'ProductName', 'UnitPrice'],
            [D(['ProductID'], ['ProductName', 'UnitPrice'])],
          ),
          T(
            'OrderLines',
            ['OrderID', 'ProductID'],
            ['OrderID', 'ProductID', 'Quantity'],
            [D(['OrderID', 'ProductID'], ['Quantity'])],
            { OrderID: 'Orders.OrderID', ProductID: 'Products.ProductID' },
          ),
        ],
      },
    },
  },
  enrolments: {
    title: 'Enrolments: partial and transitive dependencies',
    assumptions:
      'The only candidate key is (StudentID, CourseID). A student has one current name and may enrol once per course. Each course has one title and one lecturer. Each lecturer has one current name. The mark describes one student-course pair.',
    data: [
      {
        StudentID: 1,
        CourseID: 10,
        StudentName: 'Lebo',
        CourseName: 'Databases',
        LecturerID: 7,
        LecturerName: 'Modipa',
        Mark: 70,
      },
      {
        StudentID: 1,
        CourseID: 20,
        StudentName: 'Lebo',
        CourseName: 'Programming',
        LecturerID: 8,
        LecturerName: 'Malatji',
        Mark: 82,
      },
      {
        StudentID: 2,
        CourseID: 10,
        StudentName: 'Naledi',
        CourseName: 'Databases',
        LecturerID: 7,
        LecturerName: 'Modipa',
        Mark: 65,
      },
    ],
    stages: {
      1: {
        explanation:
          'The composite key is StudentID plus CourseID. Names and course facts depend on only part of that key. Mark depends on the whole pair. CourseID determines LecturerID, which determines LecturerName.',
        tables: [
          T(
            'Enrolment',
            ['StudentID', 'CourseID'],
            [
              'StudentID',
              'CourseID',
              'StudentName',
              'CourseName',
              'LecturerID',
              'LecturerName',
              'Mark',
            ],
            [
              D(['StudentID', 'CourseID'], ['Mark']),
              D(['StudentID'], ['StudentName'], 'partial'),
              D(['CourseID'], ['CourseName', 'LecturerID'], 'partial'),
              D(['LecturerID'], ['LecturerName'], 'transitive'),
            ],
          ),
        ],
      },
      2: {
        explanation:
          'Student and course facts move to their own tables. Enrolments retains the two foreign keys and Mark. Courses still contains a non-key determinant: LecturerID determines LecturerName.',
        tables: [
          T(
            'Students',
            ['StudentID'],
            ['StudentID', 'StudentName'],
            [D(['StudentID'], ['StudentName'])],
          ),
          T(
            'Courses',
            ['CourseID'],
            ['CourseID', 'CourseName', 'LecturerID', 'LecturerName'],
            [
              D(['CourseID'], ['CourseName', 'LecturerID']),
              D(['LecturerID'], ['LecturerName'], 'transitive'),
            ],
          ),
          T(
            'Enrolments',
            ['StudentID', 'CourseID'],
            ['StudentID', 'CourseID', 'Mark'],
            [D(['StudentID', 'CourseID'], ['Mark'])],
            { StudentID: 'Students.StudentID', CourseID: 'Courses.CourseID' },
          ),
        ],
      },
      3: {
        explanation:
          'Move lecturer details to Lecturers and retain LecturerID as a foreign key in Courses. Students, Lecturers, Courses and Enrolments each store facts about their own key.',
        tables: [
          T(
            'Students',
            ['StudentID'],
            ['StudentID', 'StudentName'],
            [D(['StudentID'], ['StudentName'])],
          ),
          T(
            'Lecturers',
            ['LecturerID'],
            ['LecturerID', 'LecturerName'],
            [D(['LecturerID'], ['LecturerName'])],
          ),
          T(
            'Courses',
            ['CourseID'],
            ['CourseID', 'CourseName', 'LecturerID'],
            [D(['CourseID'], ['CourseName', 'LecturerID'])],
            { LecturerID: 'Lecturers.LecturerID' },
          ),
          T(
            'Enrolments',
            ['StudentID', 'CourseID'],
            ['StudentID', 'CourseID', 'Mark'],
            [D(['StudentID', 'CourseID'], ['Mark'])],
            { StudentID: 'Students.StudentID', CourseID: 'Courses.CourseID' },
          ),
        ],
      },
    },
  },
  employees: {
    title: 'Employees: single key and transitive dependency',
    assumptions:
      'Each EmployeeID identifies one employee with one name and department. Each DepartmentID identifies one department name. EmployeeID is the only candidate key assumed in this teaching example.',
    data: [
      { EmployeeID: 1, EmployeeName: 'Lebo', DepartmentID: 10, DepartmentName: 'IT' },
      { EmployeeID: 2, EmployeeName: 'Naledi', DepartmentID: 10, DepartmentName: 'IT' },
      {
        EmployeeID: 3,
        EmployeeName: 'Thabo',
        DepartmentID: 20,
        DepartmentName: 'Finance',
      },
    ],
    stages: {
      1: {
        explanation:
          'Every cell contains one value. EmployeeID determines the employee facts, but DepartmentID determines DepartmentName. Repeating the department name in employee rows creates an update anomaly.',
        tables: [
          T(
            'Employees',
            ['EmployeeID'],
            ['EmployeeID', 'EmployeeName', 'DepartmentID', 'DepartmentName'],
            [
              D(['EmployeeID'], ['EmployeeName', 'DepartmentID']),
              D(['DepartmentID'], ['DepartmentName'], 'transitive'),
            ],
          ),
        ],
      },
      2: {
        explanation:
          'No decomposition is needed for 2NF here: the only candidate key has one attribute, so there is no proper subset on which a non-key attribute can depend. This does not establish 3NF; the department-name transitive dependency remains.',
        tables: [
          T(
            'Employees',
            ['EmployeeID'],
            ['EmployeeID', 'EmployeeName', 'DepartmentID', 'DepartmentName'],
            [
              D(['EmployeeID'], ['EmployeeName', 'DepartmentID']),
              D(['DepartmentID'], ['DepartmentName'], 'transitive'),
            ],
          ),
        ],
      },
      3: {
        explanation:
          'Create Departments and retain DepartmentID as a foreign key on Employees. The department name is stored once per department. Joining by DepartmentID reconstructs the employee-department information.',
        tables: [
          T(
            'Departments',
            ['DepartmentID'],
            ['DepartmentID', 'DepartmentName'],
            [D(['DepartmentID'], ['DepartmentName'])],
          ),
          T(
            'Employees',
            ['EmployeeID'],
            ['EmployeeID', 'EmployeeName', 'DepartmentID'],
            [D(['EmployeeID'], ['EmployeeName', 'DepartmentID'])],
            { DepartmentID: 'Departments.DepartmentID' },
          ),
        ],
      },
    },
  },
};
Object.assign(normalisationExamples, additionalExamples);
const palette = {
  full: { colour: '#166534', label: 'Full / key dependency', dash: '' },
  partial: { colour: '#92400e', label: 'Partial dependency', dash: '8 4' },
  transitive: { colour: '#6b21a8', label: 'Transitive dependency', dash: '3 4' },
};
const describe = (d) => `${d.from.join(' + ')} determines ${d.to.join(', ')}`;
export function dependencyDiagram(table, prefix = 'nf', question = false) {
  const cell = 150,
    width = Math.max(640, table.attributes.length * cell + 32),
    lower = table.dependencies.filter((d) => d.kind !== 'full'),
    height = 310 + lower.length * 76;
  const x = (name) => 16 + table.attributes.indexOf(name) * cell + cell / 2,
    targets = table.attributes.filter((a) => !table.key.includes(a));
  const keyText =
      (table.key.length > 1 ? 'Composite primary key: ' : 'Primary key: ') +
      table.key.join(' + '),
    mid = (Math.min(...table.key.map(x)) + Math.max(...table.key.map(x))) / 2;
  return `<figure class="nf-table-diagram"><figcaption><strong>${e(table.name)}</strong></figcaption><div class="nf-scroll" tabindex="0" role="region" aria-label="${e(table.name)} dependency diagram; scroll horizontally if needed"><svg style="--nf-width:${width}px" viewBox="0 0 ${width} ${height}" role="img" aria-label="${e(keyText + '. ' + table.dependencies.map(describe).join('. '))}" xmlns="http://www.w3.org/2000/svg"><defs>${Object.entries(
    palette,
  )
    .map(
      ([kind, p]) =>
        `<marker id="${prefix}-${kind}" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="${p.colour}"/></marker>`,
    )
    .join(
      '',
    )}</defs><text x="16" y="24" font-size="14" fill="#1e3a5f">${e(keyText)}</text><text x="16" y="48" font-size="13" fill="#166534">Upper arrows: the whole primary key determines every non-key attribute.</text><g fill="none" stroke="#166534" stroke-width="2">${table.key.map((k) => `<path d="M${x(k)} 158 V92 H${mid} V70"/>`).join('')}${targets.map((a) => `<path d="M${mid} 70 H${x(a)} V156" marker-end="url(#${prefix}-full)"/>`).join('')}</g>${table.attributes.map((name, i) => `<rect x="${16 + i * cell}" y="160" width="${cell}" height="60" fill="${table.key.includes(name) ? '#e7f0ff' : '#ffffff'}" stroke="#6a90b9"/><text x="${16 + i * cell + cell / 2}" y="184" text-anchor="middle" font-size="13" font-weight="${table.key.includes(name) ? '700' : '400'}" text-decoration="${table.key.includes(name) ? 'underline' : 'none'}" fill="#19344c">${e(name)}</text><text x="${16 + i * cell + cell / 2}" y="206" text-anchor="middle" font-size="11" fill="#34516d">${table.key.includes(name) ? 'PK' : ''}${table.foreign[name] ? (table.key.includes(name) ? ' / FK' : 'FK') : ''}</text>`).join('')}${lower
    .map((d, i) => {
      const py = 258 + i * 76,
        p = palette[d.kind],
        sources = d.from.map(x),
        centre = (Math.min(...sources) + Math.max(...sources)) / 2;
      return `<g fill="none" stroke="${p.colour}" stroke-width="2" stroke-dasharray="${p.dash}">${sources.map((sx) => `<path d="M${sx} 220 V${py} H${centre}"/>`).join('')}${d.to.map((name) => `<path d="M${centre} ${py} H${x(name)} V224" marker-end="url(#${prefix}-${d.kind})"/>`).join('')}</g><text x="16" y="${py + 30}" font-size="14" fill="${p.colour}">${e((question ? 'Dependency' : p.label) + ': ' + describe(d))}</text>`;
    })
    .join('')}<text x="16" y="${height - 20}" font-size="13" fill="#1e3a5f">${e(
    question
      ? 'Classify the lower dependencies using the stated business rules.'
      : table.dependencies
          .filter((d) => d.kind === 'full')
          .map((d) => 'Full/key: ' + describe(d))
          .join('; ') || 'Key paths above may be implied through the lower dependencies.',
  )}</text></svg></div><button type="button" class="button secondary nf-fit" data-fit-diagram="${prefix}" aria-pressed="false">Fit whole diagram</button>${
    Object.keys(table.foreign).length
      ? `<p class="nf-foreign">${Object.entries(table.foreign)
          .map(([name, target]) => `${e(name)} references ${e(target)}`)
          .join('; ')}.</p>`
      : ''
  }</figure>`;
}
export function bindDiagramFit(host) {
  host.querySelectorAll('[data-fit-diagram]').forEach(
    (button) =>
      (button.onclick = () => {
        const figure = button.closest('figure'),
          fit = !figure.classList.contains('nf-is-fit');
        figure.classList.toggle('nf-is-fit', fit);
        button.setAttribute('aria-pressed', String(fit));
        button.textContent = fit ? 'Show readable size' : 'Fit whole diagram';
      }),
  );
}
export function normalisationRules() {
  return `<section class="panel nf-rules"><h2>Rules for 1NF, 2NF and 3NF</h2><p>A functional dependency X determines Y means that equal X values must always have equal Y values under the business rules. A candidate key uniquely identifies a row and is minimal. A superkey uniquely identifies a row but need not be minimal. A prime attribute belongs to at least one candidate key.</p><div class="scroll-table"><table class="db-table"><thead><tr><th>Stage</th><th>Rule</th><th>What to do</th></tr></thead><tbody><tr><th>1NF</th><td>One value from the intended domain per cell, no repeating groups, and rows distinguishable by a key.</td><td>Move lists into separate rows or related tables. State all candidate keys and functional dependencies. 1NF may still contain partial and transitive dependencies.</td></tr><tr><th>2NF</th><td>Already in 1NF. Every non-prime attribute depends on the whole of every candidate key, not a proper subset.</td><td>Move partial dependencies into their own tables. Retain the complete composite key with facts about the whole combination. A single-attribute primary key alone does not prove 2NF if another composite candidate key exists.</td></tr><tr><th>3NF</th><td>Already in 2NF. For every non-trivial dependency X determines A, X is a superkey or A is prime.</td><td>In these exercises, remove non-key transitive dependencies: key determines a non-key determinant, which determines another non-key attribute. Create a table for that determinant and retain its identifier as a foreign key.</td></tr></tbody></table></div><h3>Read the arrows correctly</h3><p>Underlined, shaded attributes form the primary key. Upper arrows show everything determined by that key, including implied paths. They do not prove every dependency is full: test whether a smaller subset determines the attribute. Lower arrows show partial or transitive dependencies. Arrow position is a drawing convention; the determinant and business rules establish the dependency.</p><p>A full dependency needs the entire determinant; a partial dependency needs only a proper subset of a candidate key. A transitive dependency in these examples passes through a non-key determinant. Do not remove every foreign key: preserve the links needed to join the tables. Never invent dependencies just because a few sample rows happen to match.</p><p>All examples below state their only candidate key and assume atomic cells. This keeps their partial/transitive classifications unambiguous. Decomposition must preserve data without spurious joins and should preserve dependencies.</p></section>`;
}
export function stageHTML(exampleId = 'orders', stage = 1) {
  const example = normalisationExamples[exampleId] || normalisationExamples.orders;
  const n = [1, 2, 3].includes(Number(stage)) ? Number(stage) : 1,
    model = example.stages[n];
  return `<h4>${n}NF result</h4><p>${e(model.explanation)}</p><p class="note"><strong>Business rules:</strong> ${e(example.assumptions)}</p><div class="nf-legend" aria-label="Dependency legend">${Object.entries(
    palette,
  )
    .map(([kind, p]) => `<span class="nf-key nf-${kind}">${e(p.label)}</span>`)
    .join(
      '',
    )}<span>Underlined attributes: primary key. FK: foreign key.</span></div>${model.tables.map((t, i) => dependencyDiagram(t, `nf-${exampleId}-${n}-${i}`)).join('')}<div class="scroll-table"><table class="db-table"><caption>Dependencies in the current ${n}NF tables</caption><thead><tr><th>Table</th><th>Determinant</th><th>Determines</th><th>Classification</th></tr></thead><tbody>${model.tables.flatMap((t) => t.dependencies.map((d) => `<tr><td>${e(t.name)}</td><td>${e(d.from.join(' + '))}</td><td>${e(d.to.join(', '))}</td><td>${e(palette[d.kind].label)}</td></tr>`)).join('')}</tbody></table></div><details class="nf-sample"><summary>Inspect sample rows for these tables</summary><p>These rows illustrate the stated rules; a small sample cannot prove a functional dependency.</p>${model.tables
    .map((t) => {
      const seen = new Set(),
        rows = example.data
          .map((r) => t.attributes.map((a) => r[a]))
          .filter((row) => {
            const key = JSON.stringify(row);
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
      return `<div class="scroll-table"><table class="db-table"><caption>${e(t.name)}</caption><thead><tr>${t.attributes.map((a) => `<th>${e(a)}${t.key.includes(a) ? ' (PK)' : ''}${t.foreign[a] ? ' (FK)' : ''}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((v) => `<td>${e(String(v))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    })
    .join('')}</details>`;
}
export function normalisationWalkthrough() {
  return `<div class="normal-worked"><h3>Follow the normalisation</h3><p><a class="button secondary" href="#normalisation">Rules and nine diagram practice cases</a></p><label class="field-label" for="nf-example">Worked scenario</label><select id="nf-example">${Object.entries(
    normalisationExamples,
  )
    .map(([id, x]) => `<option value="${id}">${e(x.title)}</option>`)
    .join(
      '',
    )}</select><p class="muted">Compare the same data at each stage. Wide diagrams scroll within their frame.</p><div class="button-row" aria-label="Normalisation stage">${[1, 2, 3].map((n) => `<button class="button ${n === 1 ? '' : 'secondary'}" data-nf="${n}" aria-pressed="${n === 1}">${n}NF</button>`).join('')}</div><div id="nf-content" aria-live="polite"></div></div>`;
}
export function bindNormalisation(panel) {
  let stage = 1;
  const select = panel.querySelector('#nf-example'),
    host = panel.querySelector('#nf-content');
  if (!select || !host) return;
  const show = (n) => {
    stage = n;
    host.innerHTML = stageHTML(select.value, n);
    bindDiagramFit(host);
    panel.querySelectorAll('[data-nf]').forEach((b) => {
      b.classList.toggle('secondary', Number(b.dataset.nf) !== n);
      b.setAttribute('aria-pressed', Number(b.dataset.nf) === n);
    });
  };
  select.onchange = () => show(stage);
  panel
    .querySelectorAll('[data-nf]')
    .forEach((b) => (b.onclick = () => show(Number(b.dataset.nf))));
  show(1);
}
