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
      'HTML 1 . Create your first page',
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
      'HTML 2 . Organise text and lists',
      'Use headings to identify sections and paragraphs for prose. An unordered list groups items whose order can change. Put each item inside li. Use ol when the order matters.',
      `<h2>What to bring</h2>
<ul>
  <li>Your item</li>
  <li>Its charger, if available</li>
</ul>`,
      'Add a third item and convert the list to a numbered sequence. The browser should display three numbered entries.',
    ],
    [
      'html',
      'HTML 3 . Add metadata and a viewport',
      'The title names the tab. A description summarises the page. The viewport setting lets mobile browsers use the device width for layout.',
      '<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="description" content="Find Saturday repair sessions on campus.">',
      'Add these to head. Check the page in a narrow viewport.',
      'The page uses the phone-width viewport and the metadata remains outside the visible body.',
    ],
    [
      'html',
      'HTML 4 . Use emphasis, quotations and character references',
      'Use strong for importance, em for stress and blockquote for an extended quotation. Use &amp; and &lt; to display literal ampersands and less-than signs.',
      '<p><strong>Bring a charger.</strong> We accept lamps &amp; fans.</p>\n<blockquote><p>Repair keeps useful items in service.</p></blockquote>',
      'Add text displaying 2 < 3 without introducing a tag.',
      'Write 2 &lt; 3 in the source.',
    ],
    [
      'html',
      'HTML 5 . Nest elements and add comments',
      'Elements form a tree. Close the inner element before its parent. Comments annotate source and are visible when someone inspects it.',
      '<!-- Confirm times before publishing. -->\n<p>Sessions start at <strong>10:00</strong>.</p>',
      'Move strong into a second paragraph and inspect both nodes.',
      'Each strong element should be inside the paragraph it describes.',
    ],
    [
      'html',
      'HTML 6 . Build ordered, unordered and description lists',
      'Use ol for a sequence, ul for a collection and dl for terms and descriptions. A description list pairs dt with dd.',
      '<dl>\n  <dt>Drop-off</dt>\n  <dd>Bring your item to the volunteer desk.</dd>\n</dl>',
      'Describe Collection, then list two ordered drop-off steps.',
      'Use another dt/dd pair and a separate ol containing li elements.',
    ],
  ],
  'html-elements': [
    [
      'html',
      'HTML 7 . Add links and images',
      'href gives a link its destination. src locates an image. alt communicates the relevant image content when a visitor cannot see it. These relative paths start beside the current HTML file.',
      `<a href="visit.html">Find the repair venue</a>
<img src="images/bench.webp" alt="Repair bench with hand tools">`,
      'Create visit.html and put a photo at the shown path. Click the link, then check the image and its alternative text with DevTools.',
    ],
    [
      'html',
      'HTML 8 . Give the page structure',
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
    <p>Saturday, 10:00-13:00.</p>
  </section>
</main>`,
      'Use Tab to reach both links. Add a second section with an h2 and directions to the venue.',
    ],
    [
      'html',
      'HTML 9 . Build a labelled form',
      'A label’s for value matches the field’s id. name identifies the value when the form is submitted. required and type="email" enable browser validation for this field.',
      `<form>
  <label for="email">Email address</label>
  <input id="email" name="email" type="email" required>
  <button type="submit">Check address</button>
</form>`,
      'On a local practice page try an empty field and an invalid address. Check that the browser flags each one. Use fictional values for testing.',
    ],
    [
      'html',
      'HTML 10 . Link to sections and nested pages',
      'A fragment finds an element with a matching id. IDs should be unique within a page. Relative paths resolve from the current page.',
      '<a href="visit.html#venue">Find the venue</a>\n<!-- In visit.html -->\n<h2 id="venue">Student Centre</h2>',
      'Create the destination and follow the link from Home.',
      'The browser opens visit.html and moves to the venue heading.',
    ],
    [
      'html',
      'HTML 11 . Add captions and responsive images',
      'figure groups media with its caption. alt describes essential visual information. srcset and sizes let the browser pick an image candidate.',
      '<figure>\n  <img src="bench-640.jpg" srcset="bench-640.jpg 640w, bench-1280.jpg 1280w" sizes="(max-width: 640px) 100vw, 640px" alt="Volunteer testing a desk lamp">\n  <figcaption>Electrical repairs station</figcaption>\n</figure>',
      'Provide both image files and inspect the currentSrc value at different widths.',
      'The selected file depends on viewport size, pixel density and browser cache.',
    ],
    [
      'html',
      'HTML 12 . Structure a data table',
      'Use caption for the topic and th for headers. scope associates a simple row or column header with data cells.',
      '<table>\n  <caption>Saturday sessions</caption>\n  <thead><tr><th scope="col">Time</th><th scope="col">Station</th></tr></thead>\n  <tbody><tr><td>10:00</td><td>Electrical</td></tr></tbody>\n</table>',
      'Add a second session as a new row.',
      'Add a tr with two td cells inside tbody.',
    ],
    [
      'html',
      'HTML 13 . Add audio, video and captions',
      'The controls attribute exposes playback controls. Supply captions with a WebVTT track when speech or sounds convey information.',
      '<video controls width="480">\n  <source src="demo.mp4" type="video/mp4">\n  <track kind="captions" src="demo-en.vtt" srclang="en" label="English">\n</video>',
      'Create a short caption file and enable it in the player.',
      'Start the file with WEBVTT and give each caption a start and end time.',
    ],
    [
      'html',
      'HTML 14 . Use details and summary',
      'A native disclosure opens and closes without JavaScript. The summary should say what the expanded content contains.',
      '<details>\n  <summary>What can I bring?</summary>\n  <p>Bring a lamp, fan or bicycle.</p>\n</details>',
      'Use Tab and Space to open the answer.',
      'The summary can receive focus and the answer appears when expanded.',
    ],
    [
      'html',
      'HTML 15 . Group choices and build useful forms',
      'fieldset groups related controls. Use a shared name for radios so only one option can be selected. Give every choice a label and a value.',
      '<fieldset>\n  <legend>Session</legend>\n  <label><input type="radio" name="session" value="10" required> 10:00</label>\n  <label><input type="radio" name="session" value="12"> 12:00</label>\n</fieldset>',
      'Place the fieldset in a form and try selecting both options.',
      'Selecting the second radio clears the first. Submitting without either option triggers validation.',
    ],
    [
      'html',
      'HTML 16 . Choose a select list and textarea',
      'select offers a fixed set of options. textarea handles multiline text. Labels make both controls easier to identify.',
      '<label for="item">Item type</label>\n<select id="item" name="item"><option value="lamp">Lamp</option></select>\n<label for="notes">Repair notes</label>\n<textarea id="notes" name="notes" rows="4" maxlength="300"></textarea>',
      'Add Fan and enter a two-line note.',
      'The new option appears and the textarea preserves line breaks.',
    ],
  ],
  'build-validate': [
    [
      'html',
      'HTML 17 . Verify a small website',
      'Add the navigation on each page, follow every link in both directions and check for spelling or case mismatches. Run a markup validator and fix the earliest reported error first because one missing tag can cause several messages.',
      `<!-- On visit.html -->
<nav aria-label="Main">
  <a href="index.html">Home</a>
  <a href="visit.html" aria-current="page">Visit</a>
</nav>`,
      'Mark Home as the current page on index.html. Navigate in both directions and verify that exactly one link is marked current on each page.',
    ],
    [
      'html',
      'HTML 18 . Understand GET and POST forms',
      'GET appends successful controls to the URL query. POST puts form data in the request body. A server must accept and process submissions. Use a local test page and fictional text.',
      '<form method="get" action="search.html">\n  <label>Repair topic <input name="q" required></label>\n  <button>Search</button>\n</form>',
      'Create search.html and submit the word lamp.',
      'The destination URL includes ?q=lamp. Rendering search results requires application logic.',
    ],
    [
      'html',
      'HTML 19 . Embed an external page responsibly',
      'iframe displays another document. Give it a descriptive title. The remote provider can restrict embedding. Provide a normal link when visitors need another route.',
      '<iframe src="directions.html" title="Directions to the repair café" loading="lazy"></iframe>\n<p><a href="directions.html">Open directions separately</a></p>',
      'Open the page with and without using the embedded document.',
      'Both routes should reach the same local directions.',
    ],
    [
      'html',
      'HTML 20 . Build and audit a complete site',
      'Combine semantic navigation, responsive media and a correctly labelled form. Use a markup validator and test keyboard order, headings and links in the browser.',
      '<a href="#main">Skip to content</a>\n<nav aria-label="Main"><a href="visit.html">Visit</a></nav>\n<main id="main"><h1>Repair café</h1></main>',
      'Build Home, Visit and Enquiries. Test the skip link and each direct URL.',
      'Each page should have a unique title, clear main heading, working links and usable controls.',
    ],
  ],
  'css-cascade': [
    [
      'css',
      'CSS 1 . Connect a stylesheet',
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
      'CSS 2 . Select elements and classes',
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
    [
      'css',
      'CSS 3 . Use combinators and attribute selectors',
      'A space selects any descendant. The > combinator limits a match to direct children. Attribute selectors can match presence or a specific value.',
      'nav > a[aria-current="page"] { font-weight: 700; }',
      'Move the current link inside a list item. The direct-child selector should stop matching.',
      'Use nav a[aria-current="page"] to match descendants at any depth.',
    ],
    [
      'css',
      'CSS 4 . Combine selectors and add generated decoration',
      'A comma joins independent selectors. :is() groups alternatives, while :where() does the same with zero specificity. ::before and ::after generate boxes when content is set. Keep essential labels in HTML.',
      '.notice :where(h2, h3)::after {\n  content: "";\n  display: block;\n  width: 2rem;\n  border-bottom: 3px solid currentColor;\n}',
      'Add an h3 and a paragraph inside .notice. Predict which gets an underline.',
      'Only the h3 matches. The paragraph is outside both alternatives.',
    ],
    [
      'css',
      'CSS 5 . Use colours, variables and cascade layers',
      'Use custom properties for repeated design values. An element can inherit a custom property, and var() accepts a fallback. For normal author declarations in layers, later layers beat earlier layers before specificity is compared. Unlayered author rules can override those layers.',
      '@layer base, theme;\n@layer base {\n  :root { --accent: hsl(170 65% 25%); }\n  .notice { color: var(--accent, teal); }\n}\n@layer theme {\n  .notice { color: #5b316f; }\n}',
      'Remove the theme rule, then remove --accent. Check the notice after each change.',
      'It first uses the HSL colour, then uses the teal fallback.',
    ],
    [
      'css',
      'CSS 6 . Compare inheritance, specificity and source order',
      'Inherited properties such as color follow the parent when the child has no declaration. A declaration on the child wins over an inherited value. For equal specificity in the same origin and layer, the later matching declaration wins.',
      '.notice { color: teal; }\n.notice strong { color: maroon; }\n.notice strong { color: navy; }',
      'Put a strong element inside the notice. Change the order of the two strong rules.',
      'The strong text changes from navy to maroon. The surrounding text stays teal.',
    ],
    [
      'css',
      'CSS 7 . Choose units and fluid sizes',
      'rem is relative to the root font size. em depends on the element’s font size, except on font-size itself where it uses the parent size. Percentages depend on the property. clamp() bounds a preferred value with a minimum and maximum.',
      'h1 { font-size: clamp(1.8rem, 1rem + 3vw, 3rem); }\nmain { width: min(100% - 2rem, 70rem); margin-inline: auto; }',
      'Resize the viewport and inspect the heading’s computed size.',
      'The size changes within the clamp range and stops at either bound.',
    ],
  ],
  'css-layout': [
    [
      'css',
      'CSS 8 . Set the box size and spacing',
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
      'CSS 9 . Lay out cards with Flexbox',
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
    [
      'css',
      'CSS 10 . Style text, fonts and long words',
      'A font stack lists fallbacks in order. Unitless line-height scales with the element’s font size. A readable line length can be set in ch. overflow-wrap allows long unbroken text to wrap when needed.',
      '.article {\n  font: 1rem/1.6 system-ui, sans-serif;\n  max-inline-size: 65ch;\n  overflow-wrap: anywhere;\n}',
      'Paste a long unbroken URL into the article at phone width.',
      'The text wraps within the article instead of forcing sideways scrolling.',
    ],
    [
      'css',
      'CSS 11 . Paint backgrounds, borders and shadows',
      'Background layers are drawn from first to last. cover fills the background area while preserving aspect ratio, which can crop the image. Shadows paint around a box and leave its layout dimensions unchanged.',
      '.banner {\n  color: white;\n  background: linear-gradient(#081e2cbb, #081e2cee),\n    url("bench.webp") center / cover;\n  border-radius: 0.75rem;\n  box-shadow: 0 4px 16px #081e2c44;\n}',
      'Replace the photo and check heading contrast at a narrow width.',
      'Adjust the overlay if a bright area reduces contrast. Expect the crop to change as the box changes shape.',
    ],
    [
      'css',
      'CSS 12 . Control display, overflow and visibility',
      'Block boxes generally start on a new line. Inline-block can sit in a line while accepting explicit dimensions. overflow: auto adds scrolling as needed. display: none removes the box from layout. visibility: hidden keeps its space.',
      '.code-sample { max-block-size: 12rem; overflow: auto; }\n.badge { display: inline-block; padding: 0.25em 0.6em; }',
      'Put a long code sample in the box and tab through the page.',
      'The box scrolls when needed. If the region requires keyboard focus to scroll, give it a tabindex of 0 and an accessible label.',
    ],
    [
      'css',
      'CSS 13 . Position elements and control stacking',
      'A positioned ancestor can provide the containing block for an absolutely positioned child. Sticky positioning follows normal flow until its offset threshold within a scroll container. z-index operates within stacking contexts.',
      '.card { position: relative; }\n.card .badge { position: absolute; inset-block-start: .5rem; inset-inline-end: .5rem; }\n.site-nav { position: sticky; top: 0; z-index: 2; }',
      'Scroll the page and inspect the card badge and the navigation.',
      'The badge stays anchored to its card. The navigation sticks when scrolling reaches its top offset, provided its container allows it.',
    ],
    [
      'css',
      'CSS 14 . Wrap text and contain floats',
      'Float is useful when prose should wrap around an image. A flow-root container creates a formatting context that contains its floats. Use Flexbox or Grid for component and page layouts.',
      '.story { display: flow-root; }\n.story img { float: inline-start; width: 8rem; margin-inline-end: 1rem; }',
      'Place a short paragraph after the image and give .story a border.',
      'The text wraps beside the image, and the border encloses the image even when the paragraph is short.',
    ],
    [
      'css',
      'CSS 15 . Style lists, tables and links',
      'List markers can be styled with ::marker. Border collapse lets adjacent table borders share an edge. Place a wide table inside a scrollable wrapper so the rest of the page stays fluid.',
      'li::marker { color: teal; }\n.table-wrap { overflow-x: auto; }\ntable { border-collapse: collapse; }\nth, td { padding: .5em; border: 1px solid #73818b; text-align: start; }\na { text-underline-offset: .15em; }',
      'Create a schedule with a caption, column headings and two rows. Test on a phone.',
      'Use th with scope="col". If the table exceeds available width, only its wrapper should scroll horizontally.',
    ],
    [
      'css',
      'CSS 16 . Fit, crop and filter images',
      'object-fit: cover preserves proportions while cropping to fill an image box. object-position adjusts the focal point. filter changes the rendered appearance. Use meaningful alt text in the HTML.',
      '.card img {\n  display: block; width: 100%; aspect-ratio: 4 / 3;\n  object-fit: cover; object-position: center 35%;\n}\n.archived img { filter: grayscale(1); }',
      'Compare object-fit: cover with contain using a tall photo.',
      'cover fills the frame and crops. contain shows the whole photo and can leave empty space.',
    ],
  ],
  'css-devtools': [
    [
      'css',
      'CSS 17 . Inspect states and debug rules',
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
    [
      'css',
      'CSS 18 . Style forms and keyboard states',
      'Use native controls and visible labels. :focus-visible highlights keyboard focus. :user-invalid can style fields after user interaction. Put error text next to the field so feedback has a meaning beyond colour.',
      'input, select, button { font: inherit; }\n:where(input, button, a):focus-visible { outline: 3px solid teal; outline-offset: 3px; }\ninput:user-invalid { border: 2px solid #aa1633; }',
      'Tab through a required email form and submit a malformed address.',
      'Check for a clear focus outline and validation feedback, then correct the address.',
    ],
    [
      'css',
      'CSS 19 . Transform without moving surrounding boxes',
      'translate moves the visual box, rotate turns it, and scale changes the painted size. The surrounding layout keeps its original positions. transform-origin sets the pivot.',
      '.icon {\n  display: inline-block;\n  transform-origin: center;\n  transform: translateY(-2px) rotate(8deg);\n}',
      'Set the rotation to 0deg and inspect the surrounding text.',
      'The icon rotates back while the adjacent text keeps its layout position.',
    ],
    [
      'css',
      'CSS 20 . Transition between states',
      'A transition interpolates a property when the computed value changes. Its duration, easing and delay control how the change feels. Declare it on the base rule so it also applies when leaving hover or focus.',
      '.action { transition: transform 180ms ease-out, background-color 180ms ease-out; }\n.action:is(:hover, :focus-visible) {\n  transform: translateY(-2px);\n  background-color: #c4e9dd;\n}',
      'Hover and then tab to the action. Set the duration to 1s temporarily.',
      'Observe the change enter and leave smoothly. Restore a short duration after the comparison.',
    ],
    [
      'css',
      'CSS 21 . Create a multi-stage keyframe animation',
      '@keyframes defines the timeline for an animation. 0% and 100% mark its beginning and end. Intermediate percentages let you describe motion that changes direction. The base style should remain usable before and after the animation.',
      '@keyframes badge-arrive {\n  0% { opacity: 0; transform: translateY(12px); }\n  70% { opacity: 1; transform: translateY(-3px); }\n  100% { opacity: 1; transform: translateY(0); }\n}\n.badge { animation: badge-arrive 480ms ease-out; }',
      'Move the middle keyframe from 70% to 40% and reload.',
      'The badge reaches the overshoot sooner. It still finishes at its original resting position.',
    ],
    [
      'css',
      'CSS 22 . Set animation timing, repetition and direction',
      'animation-delay schedules the start. animation-iteration-count controls the number of cycles. alternate reverses every other cycle. animation-fill-mode controls which keyframe styles apply outside active playback.',
      '.signal {\n  animation-name: signal-glow;\n  animation-duration: 650ms;\n  animation-delay: 200ms;\n  animation-timing-function: ease-in-out;\n  animation-iteration-count: 2;\n  animation-direction: alternate;\n  animation-fill-mode: backwards;\n}\n@keyframes signal-glow { from { opacity: .6; } to { opacity: 1; } }',
      '.signal should pause while hovered. Add the rule and try again.',
      'Use .signal:hover { animation-play-state: paused; }. Move the pointer away to resume.',
    ],
    [
      'css',
      'CSS 23 . Respect reduced motion',
      'Some visitors ask their device to reduce motion. Use prefers-reduced-motion to remove optional movement while keeping the state or message visible. Prefer transform and opacity for common motion effects, and use DevTools to inspect the result.',
      '@media (prefers-reduced-motion: reduce) {\n  .badge, .signal { animation: none; opacity: 1; }\n  .action { transition: none; }\n  .action:is(:hover, :focus-visible) { transform: none; }\n}',
      'Emulate reduced motion in the browser and refocus the action.',
      'The focus state is still visible. The action does not move, and the badge and signal remain visible without playback.',
    ],
  ],
  'responsive-layout': [
    [
      'css',
      'CSS 24 . Build a responsive grid',
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
    [
      'css',
      'CSS 25 . Size responsive grids and span tracks',
      'minmax() gives tracks a permitted size range. auto-fit collapses empty repeated tracks. A grid item can span multiple columns by referring to grid lines.',
      '.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));\n  gap: 1rem;\n}\n.gallery > header { grid-column: 1 / -1; }',
      'Use a header and five cards and resize the page.',
      'The header spans the full grid. Cards gain columns as space becomes available.',
    ],
    [
      'css',
      'CSS 26 . Adapt a component with container queries',
      'A media query reads conditions such as viewport width. A container size query can respond to the width available inside a component’s ancestor, which helps when cards appear in sidebars and full-width sections.',
      '.card-slot { container-type: inline-size; }\n.card-content { display: grid; gap: 1rem; }\n@container (min-width: 28rem) {\n  .card-content { grid-template-columns: 1fr 2fr; }\n}',
      'Place one card in a narrow sidebar and one in a wide main area at the same viewport width.',
      'Only the card whose container reaches 28rem uses two columns.',
    ],
    [
      'css',
      'CSS 27 . Use feature queries and print styles',
      '@supports checks whether the browser accepts a property-value pair. Keep usable base styles outside the feature query. @media print applies to printed output and print previews.',
      '.cards { display: block; }\n@supports (display: grid) { .cards { display: grid; gap: 1rem; } }\n@media print {\n  nav, .action { display: none; }\n  body { color: black; background: white; }\n  .card { break-inside: avoid; }\n}',
      'Open print preview for the café schedule.',
      'Check that times and venue remain visible and that navigation controls are absent from the printed page.',
    ],
    [
      'css',
      'CSS 28 . Build and test the repair café stylesheet',
      'Combine reusable design values, fluid layout, keyboard focus and responsive cards into one stylesheet. Inspect a phone-width layout, tab through it, and test optional motion both ways.',
      '.page { width: min(100% - 2rem, 70rem); margin-inline: auto; }\n.session-list { display: grid; gap: 1rem; }\n@media (min-width: 48rem) {\n  .session-list { grid-template-columns: repeat(3, minmax(0, 1fr)); }\n}',
      'Build a schedule, a status badge and a booking link. Test at 320px, 768px and a desktop width.',
      'Verify one column below 48rem and three at or above it, visible keyboard focus, and a still-readable badge with reduced motion enabled.',
    ],
  ],
  'javascript-jquery': [
    [
      'js',
      'JavaScript 1 . Load and run a script',
      'Save the example in site.js. Add <script src="site.js" defer></script> in the HTML head. defer lets an external script run after the HTML has been parsed. Console output helps you confirm that the script loaded.',
      `const venue = 'Student Centre';
console.log(venue);`,
      'Open DevTools Console and refresh. Change the venue and confirm the new value appears.',
    ],
    [
      'js',
      'JavaScript 2 . Use variables and expressions',
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
      'JavaScript 3 . Make decisions with a function',
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
      'JavaScript 4 . Update an element on click',
      'Add a button with id="show-hours" and a paragraph with id="status" to your HTML. querySelector finds a matching element. The click listener runs the callback. textContent writes plain text into the paragraph.',
      `const button = document.querySelector('#show-hours');
const status = document.querySelector('#status');

button.addEventListener('click', () => {
  status.textContent = 'Saturday, 10:00-13:00';
});`,
      'Click the button and activate it with the keyboard. Change the hour in the script and confirm both inputs show the same new text.',
    ],
    [
      'js',
      'JavaScript 5 . Work through a list',
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
    [
      'js',
      'JavaScript 6 . Compare numbers, strings and booleans',
      'Input values are often strings. Convert with Number when arithmetic is required. Strict equality compares both type and value.',
      "const raw = '12';\nconsole.log(raw === 12);\nconsole.log(Number(raw) === 12);",
      "Try 'twelve' and check the converted result.",
      "Number('twelve') produces NaN. Number.isNaN can recognise it.",
    ],
    [
      'js',
      'JavaScript 7 . Format messages with template literals',
      'Backticks create template literals. An expression inside interpolation braces is evaluated when the string is built.',
      'const count = 4;\nconst message = `Available places: ${count}`;\nconsole.log(message);',
      'Display how many places remain after one more booking.',
      'Use ${count - 1} to show 3.',
    ],
    [
      'js',
      'JavaScript 8 . Combine conditions',
      'Use && when both conditions must hold, ',
      '',
      ' when either can hold and ! to negate a boolean. Parentheses make a combined rule explicit.',
      'const remaining = 3;\nconst open = true;\nconst canBook = open && remaining > 0;\nconsole.log(canBook);',
      'Test the rule with remaining set to 0.',
      'canBook becomes false even while the session is open.',
    ],
    [
      'js',
      'JavaScript 9 . Use object properties',
      'Objects group related data. Dot notation accesses a known key. Brackets accept a runtime key.',
      "const session = { venue: 'Student Centre', capacity: 12 };\nconst field = 'capacity';\nconsole.log(session[field]);",
      'Add a day and print it using dot notation.',
      'Use session.day after adding a day property.',
    ],
    [
      'js',
      'JavaScript 10 . Filter, map and total arrays',
      'filter keeps matching elements. map produces one result for each element it visits. reduce combines elements into an accumulated value.',
      "const places = [4, 0, 2];\nconst open = places.filter(n => n > 0);\nconst labels = open.map(n => n + ' places');\nconst total = open.reduce((sum, n) => sum + n, 0);",
      'Add a session with one place. Predict open and total.',
      'open becomes [4, 2, 1] and total becomes 7.',
    ],
    [
      'js',
      'JavaScript 11 . Distinguish block scope and mutation',
      'let and const are block scoped. An object held by const can still have its properties changed, while the binding cannot be reassigned.',
      'const session = { places: 2 };\nif (session.places > 0) {\n  const remaining = session.places - 1;\n  session.places = remaining;\n}\nconsole.log(session.places);',
      'Move console.log(remaining) outside the if block and inspect the error.',
      'remaining is out of scope there. Read session.places after the block.',
    ],
    [
      'js',
      'JavaScript 12 . Use event delegation',
      'A click bubbles from a child to its ancestors. One listener on a list can handle nested buttons, including buttons added later.',
      "const list = document.querySelector('#sessions');\nlist.addEventListener('click', event => {\n  const button = event.target.closest('button[data-session]');\n  if (button) console.log(button.dataset.session);\n});",
      'Add a button with data-session="morning" inside #sessions and click it.',
      'The console shows morning, including when you click text nested inside the button.',
    ],
    [
      'js',
      'JavaScript 13 . Toggle a class and synchronise state',
      'classList.toggle adds or removes a named class. Its return value tells you whether the class is present. Keep accessible button state aligned with the visible state.',
      "const button = document.querySelector('#compact');\nbutton.addEventListener('click', () => {\n  const active = document.body.classList.toggle('compact');\n  button.setAttribute('aria-pressed', String(active));\n});",
      'Add id="compact" and aria-pressed="false" to a button, then click twice.',
      'aria-pressed changes to true and back to false. CSS can style the compact class.',
    ],
  ],
  'forms-responses': [
    [
      'js',
      'JavaScript 14 . Handle a practice form',
      'Give your local form id="enquiry" and add a paragraph with id="feedback" and role="status". The submit event occurs after ordinary browser validation. preventDefault keeps this demonstration on the current page. A hosted form needs its own submission and response setup.',
      `const form = document.querySelector('#enquiry');
const feedback = document.querySelector('#feedback');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  feedback.textContent = 'Practice entry checked.';
});`,
      'Submit an empty required field, then a valid fictional entry. Confirm that only the valid attempt reaches the feedback message.',
    ],
    [
      'js',
      'JavaScript 15 . Read and validate form data',
      'FormData reads named successful controls. Check empty text after trim and use built-in validation for types and required fields.',
      "function readEnquiry(form) {\n  const data = new FormData(form);\n  return String(data.get('item') ?? '').trim();\n}",
      'Read a textarea named item containing spaces only.',
      'The function returns an empty string. Present a specific error before processing it.',
    ],
    [
      'js',
      'JavaScript 16 . Parse and serialise JSON',
      'JSON.stringify writes JSON text and JSON.parse reads it. JSON represents data such as objects, arrays, strings and numbers.',
      "const saved = JSON.stringify({ item: 'lamp', places: 2 });\nconst restored = JSON.parse(saved);\nconsole.log(restored.item);",
      "Try JSON.parse('{invalid}') and inspect the error.",
      'The invalid text causes a SyntaxError. Handle invalid data before using it.',
    ],
    [
      'js',
      'JavaScript 17 . Save and restore a browser preference',
      'localStorage stores strings per origin. Save a simple preference and provide a default when it is missing. Use a normal local HTTP preview.',
      "function saveView(view) { localStorage.setItem('repair-view', view); }\nfunction loadView() { return localStorage.getItem('repair-view') ?? 'comfortable'; }",
      "Call saveView('compact'), reload, then call loadView().",
      'It restores compact in the same browser profile and origin.',
    ],
    [
      'js',
      'JavaScript 18 . Handle errors with try and catch',
      'Code in try runs first. catch handles a thrown error so the page can offer a useful fallback. Limit the try block to the operation you intend to recover from.',
      "function readSettings(text) {\n  try { return JSON.parse(text); }\n  catch (error) { return { view: 'comfortable' }; }\n}",
      'Call the function with valid JSON and then malformed text.',
      'Valid JSON parses. Malformed text returns the default object.',
    ],
    [
      'js',
      'JavaScript 19 . Fetch JSON with async and await',
      'await pauses an async function until a promise settles. Check response.ok because fetch can resolve for an HTTP error. Use a local sessions.json file served over HTTP.',
      "async function loadSessions() {\n  const response = await fetch('./sessions.json');\n  if (!response.ok) throw new Error('Could not load sessions');\n  return await response.json();\n}",
      'Create sessions.json, log the result, then rename the file and catch the rejection.',
      'Use loadSessions().then(console.log).catch(console.error). A missing file takes the error path.',
    ],
    [
      'js',
      'JavaScript 20 . Split code into modules',
      'export makes a binding importable. Import using a relative path with the file extension. Load the entry script with type="module" from an HTTP preview.',
      '// capacity.js\nexport const available = (limit, booked) => Math.max(0, limit - booked);\n// site.js\nimport { available } from ' +
        "'./capacity.js';\nconsole.log(available(12, 9));",
      'Put the two sections in separate files and load site.js as a module.',
      'The console shows 3. Check Network if the module path fails.',
    ],
    [
      'js',
      'JavaScript 21 . Finish and debug an interactive schedule',
      'Keep data, rendering and event handling separate. Test an empty list, a full session and a session with places. Use console output and breakpoints to inspect values.',
      "function bookingLabel(places) {\n  return places > 0 ? places + ' available' : 'Full';\n}\nconsole.assert(bookingLabel(0) === 'Full');\nconsole.assert(bookingLabel(2) === '2 available');",
      'Render the labels from sample data and add a test for one place.',
      "The sample displays each session’s state. A test for 1 should expect '1 available'.",
    ],
  ],
};
