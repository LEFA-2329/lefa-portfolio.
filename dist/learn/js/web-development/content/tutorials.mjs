// Supplementary explanations, short drills and applied exercises in outline order.
export const tutorials = {
  'online-presence': [
    'A website brief connects an audience, a need and a measurable outcome. A sitemap shows the hierarchy of pages. A wireframe shows where content and controls sit on one page. For the repair café, the sitemap might place Visit and Enquiries under Home, while the home wireframe puts the next date above the fold.',
    'Draw a sitemap with Home, Visit, Repair Rules and Enquiries. Which pages belong in primary navigation?',
    'Expose Visit, Repair Rules and Enquiries from the main navigation. Link the logo or Home item back to Home.',
    'Sketch the same home page at phone and desktop widths. Ask a partner to point to the next session date.',
    'Place the same date and venue near the top at both widths. Record the first place your partner looked and revise one placement if needed.',
  ],
  'measure-success': [
    'A usability test observes people completing a stated task. An analytics report counts recorded events over time. A baseline is the value before a change. Define the observation window, eligible visits and what qualifies as a successful action before comparing results.',
    'Calculate the completion rate for 18 successful tasks out of 24 attempts.',
    '18 ÷ 24 × 100 = 75%.',
    'A redesign produces 20 enquiries from 400 visits after a baseline of 15 from 200. Explain whether the enquiry rate improved.',
    'The rates are 5% and 7.5% respectively. Total enquiries rose by five and the rate fell by 2.5 percentage points. Check comparable periods and traffic sources.',
  ],
  'web-languages': [
    'HTML creates elements and names their roles. CSS selects elements and changes their presentation. JavaScript listens for events and updates the document through the DOM. In DevTools, Elements shows the current DOM, Network shows requested files and Console reports script errors.',
    'Identify the layer for a page heading, its font size and a click that changes its text.',
    'Use an HTML heading, a CSS font-size declaration and a JavaScript click handler respectively.',
    'Build a page with a heading and native button. Disable JavaScript and document what remains available.',
    'The heading and button markup still render. Keep essential content and navigation available as links or text. The optional scripted text change requires JavaScript.',
  ],
  'prepare-assets': [
    'Keep an asset register with the filename, creator, source URL, permission or licence, and any required credit. Images have different purposes. A site logo often suits SVG, a photograph suits an optimised raster format, and a decorative image in HTML can use empty alt text.',
    'A 2.4 MB photo becomes 300 KB after export. Estimate the reduction using 1 MB = 1,000 KB.',
    '2,100 KB smaller, or 87.5% less data.',
    'Prepare a meaningful café photo and a decorative background. Document the licence and accessibility treatment for each.',
    'Record the source and permission for each. Describe the meaningful subject in the photo’s alt text and keep decorative backgrounds out of the reading order.',
  ],
  'files-paths': [
    'A relative path starts from the folder of the file that contains the reference. In CSS, a url() path starts from the stylesheet’s folder. A path beginning with / starts at the site origin’s root. Case and spelling should match the actual filename on the server.',
    'From pages/visit.html, link to images/tools.webp in the project root.',
    'Use ../images/tools.webp.',
    'In css/site.css, load the same image as a background and test it locally and under a hosted subdirectory.',
    'Use url("../images/tools.webp"). Verify both locations in Network. Check the server filename’s capitalisation if a request returns 404.',
  ],
  'vscode-workflow': [
    'Open the project folder in VS Code so Explorer reflects the directory tree. Emmet expands abbreviations such as ! for an HTML document scaffold. Save before refreshing a preview. Use a local HTTP preview to test features that behave differently when pages open with file URLs.',
    'Expand ! in a blank HTML file and identify where the visible page content belongs.',
    'Place visible page content inside body. Set lang on html and write a descriptive title in head.',
    'Create a repeatable preview routine for two linked pages and one stylesheet.',
    'Open the folder, save all files, start a local preview and follow both navigation links. Edit a CSS rule, refresh and verify the computed style.',
  ],
  'html-dom': [
    'An element can contain text and child elements. An attribute adds information to its opening tag. Void elements such as img have no closing tag. In the DOM tree, elements with one parent are siblings. DOM structure matters when CSS selects descendants and JavaScript queries a specific element.',
    'In <main><h1>Visit</h1><p>Bring a lamp.</p></main>, identify the siblings.',
    'h1 and p are siblings and both are direct children of main.',
    'Build a page with two sections and inspect the tree. Place a heading inside each section and explain its level.',
    'Use one page h1, then an h2 per section. Confirm each h2 appears under its section in DevTools.',
  ],
  'html-elements': [
    'Use links to navigate and buttons to trigger actions. Pair each form control with a visible label. Use tables for related row and column data, with a caption and appropriate header cells. Native HTML semantics give keyboard users and assistive technology useful controls and relationships.',
    'Connect a label reading Email to an email input with id email.',
    'Use <label for="email">Email</label> and <input id="email" name="email" type="email">.',
    'Build an event schedule with a caption, Date and Venue headers and two data rows. Add a link to register.',
    'Use caption, thead, tbody and th scope="col". Give the registration link descriptive text and check it with the keyboard.',
  ],
  'build-validate': [
    'Validation checks the syntax and structure of markup. Functional testing checks whether links, forms and controls do what visitors expect. Test each page through the navigation, return home from nested pages and inspect the browser console for errors.',
    'Repair <a href="visit.html">Visit the café</p>.',
    'Close the link with </a> and verify that visit.html resolves from the current folder.',
    'Make a test table with one row per navigation link and record expected destination, actual result and repair.',
    'Test from Home and each nested page. A relative link can work on Home and fail one folder deeper. Retest after correcting the path.',
  ],
  'css-cascade': [
    'A CSS rule contains a selector and declarations. For ordinary author rules in the same layer, specificity compares IDs, then classes and attributes, then element types. If competing rules tie, the later rule wins. Some properties such as color inherit when the child has no winning declaration of its own.',
    'For <p class="notice">, which sets its color when .notice comes before p in the same sheet?',
    'The .notice rule wins because a class selector has higher specificity than a type selector.',
    'Create two equal-specificity rules for .notice, inspect the winner, then swap their order.',
    'The later rule wins in this case. Explain the change using source order and verify that the first declaration is crossed out.',
  ],
  'css-layout': [
    'The box model includes content, padding, border and margin. With border-box sizing, a declared width includes padding and border. Flexbox lays items along a main axis. Grid can align rows and columns together. Gap adds shared spacing between items.',
    'Calculate the border-box width with content-box width 200px, padding 12px per side and border 2px per side.',
    '200 + 24 + 4 = 228px before margins.',
    'Use flex-wrap and gap to lay out three event cards. Narrow the viewport and verify how cards wrap.',
    'Use display: flex, flex-wrap: wrap and a gap on the container. A flexible basis such as 14rem gives each item a starting width and allows wrapping.',
  ],
  'css-devtools': [
    'The Styles panel shows matched declarations and which rules are overridden. Computed shows the final resolved value. Inspection edits are temporary. Reproduce the successful change in the source file and reload to verify it survives.',
    'Which panel would you inspect to find the final computed width of a card?',
    'Use Computed or the box model diagram in the inspector.',
    'Diagnose a card whose color differs from the stylesheet rule you expected. Record the selector and file responsible.',
    'Inspect the card, find the winning color and its source, then simplify or scope the rule and reload. Check another card for unintended changes.',
  ],
  'responsive-layout': [
    'Mobile-first styles define the narrow layout before min-width queries introduce wider layouts. Set the viewport meta tag, use fluid dimensions and choose breakpoints where content needs more space. Test at widths just below, at and above each breakpoint.',
    'At which widths does @media (min-width: 640px) apply for 639px, 640px and 641px?',
    'It applies at 640px and 641px.',
    'Fix a 900px-wide image that overflows on a phone and test the site at 320px, 640px and 1024px.',
    'Set max-width: 100% and height: auto. Check horizontal scrolling, readable text and keyboard access at each width.',
  ],
  'javascript-jquery': [
    'Use querySelector to find the first matching DOM element. addEventListener registers a callback for an event such as click. Set textContent to display plain text. In jQuery, $(selector).on("click", handler) registers a similar handler when the library is loaded before your code.',
    'What does document.querySelector("#status") return when that ID is missing?',
    'It returns null. Check that the element exists and that your script runs after the markup is parsed.',
    'Add a button that toggles extra repair instructions. Test it with Enter and Space.',
    'Use a native button. Toggle the target’s hidden property and update aria-expanded on the button to match visibility.',
  ],
  'forms-responses': [
    'A form field’s name identifies it in submitted data. required and type="email" provide browser-side validation. A hosted Google Form can collect responses after publication with suitable responder access. Preview the embedded form and verify a test response through the owner’s Responses view.',
    'Explain the difference between id="email" and name="email".',
    'The id identifies the element for a label or script. The name identifies the field in submitted data.',
    'Create a test plan with an empty field, malformed email and a valid submission using fictional data.',
    'Expect the first two to fail validation. Verify the valid test entry arrives in the intended response view, then confirm any approved notification works.',
  ],
  'search-optimisation': [
    'A descriptive title identifies the page in the browser and helps describe it in search. The main heading identifies the topic to readers. A meta description provides a suggested summary. Internal links with descriptive text explain the destination to visitors and help search engines discover pages.',
    'Write a descriptive title for the café’s opening hours page.',
    'Repair session times and venue | Campus Repair Café.',
    'Review the Home and Visit pages for unique titles, descriptions and meaningful links.',
    'Give each page a specific title and summary. Replace a generic “click here” link with text such as “See Saturday repair session times”.',
  ],
  'publish-test': [
    'Hosting serves files over HTTP or HTTPS. A domain gives visitors a named address and DNS connects that name to the hosting service. SFTP transfers files over SSH where the host supports it. After uploading, check the deployed pages and assets at the actual public address.',
    'The home page works, but /pages/Visit.html returns 404. What should you compare first?',
    'Check the path and filename on the host, including whether the deployed file is named visit.html.',
    'Prepare a release checklist covering both the home page and a direct visit to a nested page.',
    'Verify HTTPS, navigation in both directions, styles and scripts, images, phone layout and any hosted form. Record failures against the tested URL.',
  ],
  'analytics-maintenance': [
    'Track a repeatable measure such as enquiries per 100 visits and keep its definition stable. A maintenance log records changes and checks. A backup is useful when a restore test confirms you can rebuild pages and assets in a safe test location.',
    'Compare 8 enquiries from 100 visits with 12 from 200 visits.',
    'The rates are 8% and 6%. The count rose while the rate fell by 2 percentage points.',
    'Draft a monthly maintenance checklist and prove that one backup can be restored.',
    'Check links, dates, contact details and forms. Restore to a test folder and compare the pages, styles, scripts and images with the intended version.',
  ],
};

// Each step introduces one concept, shows usable code, and gives a change to test.
export const languageSteps = {
  'html-dom': [
    [
      'html',
      'HTML 1 · Create your first page',
      'Save this as index.html and open it in a browser. The doctype selects standards mode. The head supplies information such as the browser tab title. The body holds the content visitors see.',
      `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Campus Repair Café</title>
  </head>
  <body>
    <h1>Campus Repair Café</h1>
    <p>Bring a small item for repair on Saturday.</p>
  </body>
</html>`,
      'Change the title and heading independently. The tab should show the title, while the page should show the heading.',
    ],
    [
      'html',
      'HTML 2 · Organise text and lists',
      'Use headings to identify sections and paragraphs for prose. An unordered list groups items whose order can change. Put each item inside li. Use ol when the order matters.',
      `<h2>What to bring</h2>
<ul>
  <li>Your item</li>
  <li>Its charger, if available</li>
</ul>`,
      'Add a third item and convert the list to a numbered sequence. The browser should display three numbered entries.',
    ],
  ],
  'html-elements': [
    [
      'html',
      'HTML 3 · Add links and images',
      'href gives a link its destination. src locates an image. alt communicates the relevant image content when a visitor cannot see it. These relative paths start beside the current HTML file.',
      `<a href="visit.html">Find the repair venue</a>
<img src="images/bench.webp" alt="Repair bench with hand tools">`,
      'Create visit.html and put a photo at the shown path. Click the link, then check the image and its alternative text with DevTools.',
    ],
    [
      'html',
      'HTML 4 · Give the page structure',
      'header introduces content or the site. nav groups navigation links. main identifies the page’s primary content. Use an h2 for a subsection within the main topic.',
      `<header>
  <nav aria-label="Main">
    <a href="index.html">Home</a>
    <a href="visit.html">Visit</a>
  </nav>
</header>
<main>
  <h1>Visit the repair café</h1>
  <section>
    <h2>Session times</h2>
    <p>Saturday, 10:00–13:00.</p>
  </section>
</main>`,
      'Use Tab to reach both links. Add a second section with an h2 and directions to the venue.',
    ],
    [
      'html',
      'HTML 5 · Build a labelled form',
      'A label’s for value matches the field’s id. name identifies the value when the form is submitted. required and type="email" enable browser validation for this field.',
      `<form>
  <label for="email">Email address</label>
  <input id="email" name="email" type="email" required>
  <button type="submit">Check address</button>
</form>`,
      'On a local practice page try an empty field and an invalid address. Check that the browser flags each one. Use fictional values for testing.',
    ],
  ],
  'build-validate': [
    [
      'html',
      'HTML 6 · Verify a small website',
      'Add the navigation on each page, follow every link in both directions and check for spelling or case mismatches. Run a markup validator and fix the earliest reported error first because one missing tag can cause several messages.',
      `<!-- On visit.html -->
<nav aria-label="Main">
  <a href="index.html">Home</a>
  <a href="visit.html" aria-current="page">Visit</a>
</nav>`,
      'Mark Home as the current page on index.html. Navigate in both directions and verify that exactly one link is marked current on each page.',
    ],
  ],
  'css-cascade': [
    [
      'css',
      'CSS 1 · Connect a stylesheet',
      'In the HTML head, add <link rel="stylesheet" href="site.css">. Put this rule in site.css next to the HTML page. body is the selector. Each property and value pair is a declaration.',
      `body {
  color: #18364a;
  background-color: #f4f8fa;
  font-family: system-ui, sans-serif;
}`,
      'Change the background, save, and refresh. Inspect the body element to locate the applied rule.',
    ],
    [
      'css',
      'CSS 2 · Select elements and classes',
      'Add class="notice" to an important paragraph. The dot selects a class. With these ordinary rules in the same layer, the class has greater specificity than the element selector.',
      `p {
  color: #34495e;
}
.notice {
  color: #795000;
  font-weight: 700;
}`,
      'Place a normal paragraph beside the notice. Move the p rule below .notice and predict which colour the notice keeps.',
    ],
  ],
  'css-layout': [
    [
      'css',
      'CSS 3 · Set the box size and spacing',
      'Padding separates content from its border. Margin separates the box from neighbours. With border-box, the stated width includes padding and border. In this example the content is 206px wide when the border box reaches 240px.',
      `.card {
  box-sizing: border-box;
  width: 240px;
  max-width: 100%;
  padding: 16px;
  border: 1px solid #68818e;
  margin-bottom: 12px;
}`,
      'Increase padding to 20px and use the inspector to check that the full width stays 240px when space permits, while the content area shrinks.',
    ],
    [
      'css',
      'CSS 4 · Lay out cards with Flexbox',
      'Place several .card elements inside an element with class cards. The parent controls layout and spacing. flex-wrap allows items to move onto a new row as room runs out.',
      `.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.cards > .card {
  flex: 1 1 14rem;
}`,
      'Add three cards. Narrow the window and observe when the third card wraps.',
    ],
  ],
  'css-devtools': [
    [
      'css',
      'CSS 5 · Inspect states and debug rules',
      'A pseudo-class matches a state. The :focus-visible rule gives keyboard users a visible focus indicator. Use the Styles panel to locate a winning declaration and the Computed panel to confirm its result.',
      `a:hover {
  text-decoration-thickness: 0.2em;
}
a:focus-visible {
  outline: 3px solid #12655d;
  outline-offset: 4px;
}`,
      'Press Tab until a link receives focus and compare it with mouse hover. Verify the focus outline is visible against the surrounding background.',
    ],
  ],
  'responsive-layout': [
    [
      'css',
      'CSS 6 · Build a responsive grid',
      'Add <meta name="viewport" content="width=device-width, initial-scale=1"> in the HTML head. Start with one column. Switch to two columns once the layout has room.',
      `.schedule {
  display: grid;
  gap: 1rem;
}
@media (min-width: 640px) {
  .schedule {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}`,
      'Add two items in .schedule. Test at 639px and 640px. Expect one column at the first width and two at the second.',
    ],
  ],
  'javascript-jquery': [
    [
      'js',
      'JavaScript 1 · Load and run a script',
      'Save the example in site.js. Add <script src="site.js" defer></script> in the HTML head. defer lets an external script run after the HTML has been parsed. Console output helps you confirm that the script loaded.',
      `const venue = 'Student Centre';
console.log(venue);`,
      'Open DevTools Console and refresh. Change the venue and confirm the new value appears.',
    ],
    [
      'js',
      'JavaScript 2 · Use variables and expressions',
      'Use const for a binding that stays assigned to the same value. Use let when reassigning a variable. A comparison evaluates to true or false and can control what happens next.',
      `const capacity = 12;
let registrations = 9;
registrations += 1;
const remaining = capacity - registrations;
console.log(remaining > 0);`,
      'Predict the remaining places and the logged value. Then set registrations to 11 on its initial line and run the example again.',
    ],
    [
      'js',
      'JavaScript 3 · Make decisions with a function',
      'A function groups reusable behaviour. Its parameter receives an input and return supplies a result. An if block runs when the condition is true.',
      `function placesMessage(remaining) {
  if (remaining <= 0) {
    return 'Session full';
  }
  return remaining + ' places available';
}

console.log(placesMessage(2));
console.log(placesMessage(0));`,
      'Call the function with 0, 1 and 4. Adjust the function so 1 produces “1 place available”.',
    ],
    [
      'js',
      'JavaScript 4 · Update an element on click',
      'Add a button with id="show-hours" and a paragraph with id="status" to your HTML. querySelector finds a matching element. The click listener runs the callback. textContent writes plain text into the paragraph.',
      `const button = document.querySelector('#show-hours');
const status = document.querySelector('#status');

button.addEventListener('click', () => {
  status.textContent = 'Saturday, 10:00–13:00';
});`,
      'Click the button and activate it with the keyboard. Change the hour in the script and confirm both inputs show the same new text.',
    ],
    [
      'js',
      'JavaScript 5 · Work through a list',
      'An array stores ordered values. A for...of loop visits each value in order. Create list elements with createElement and add them with append. Add a ul with id="repair-types" before trying this code.',
      `const types = ['Lamps', 'Fans', 'Bicycles'];
const list = document.querySelector('#repair-types');

for (const type of types) {
  const item = document.createElement('li');
  item.textContent = type;
  list.append(item);
}`,
      'Add a fourth repair type to the array. Refresh and verify the list shows four items in the same order as the array.',
    ],
  ],
  'forms-responses': [
    [
      'js',
      'JavaScript 6 · Handle a practice form',
      'Give your local form id="enquiry" and add a paragraph with id="feedback" and role="status". The submit event occurs after ordinary browser validation. preventDefault keeps this demonstration on the current page. A hosted form needs its own submission and response setup.',
      `const form = document.querySelector('#enquiry');
const feedback = document.querySelector('#feedback');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  feedback.textContent = 'Practice entry checked.';
});`,
      'Submit an empty required field, then a valid fictional entry. Confirm that only the valid attempt reaches the feedback message.',
    ],
  ],
};
