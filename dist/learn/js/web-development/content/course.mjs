// Lessons follow the 2026 WEDE5020 outline. Outcome numbers restart in each unit.
// A question stores the correct option's zero-based index and the reason for it.
function question(question, options, answer, explanation) {
  return { question, options, answer, explanation };
}

export const wedeUnits = [
  {
    id: 1,
    title: 'Introduction to web development',
    sessions: '1-6',
    goal: 'Decide what a campus repair café needs from its website and how the team will know whether it helps visitors.',
    checkpoint:
      'Write a one-page brief naming the audience, their main task, one measure of success and the assets you need permission to use.',
    lessons: [
      {
        slug: 'online-presence',
        title: 'Choose an online presence',
        outcomes: 'LO1-2',
        sections: [
          [
            'Start with a visitor',
            'A student with a broken desk lamp needs the next repair date, the venue and a way to ask whether the item is suitable. Those questions determine which pages to build. A site map records the pages and how a visitor can move between them.',
          ],
          [
            'Give each channel a job',
            'A social post can announce a change to followers. A map listing can help a new visitor locate the venue. An organisation’s own site can keep its timetable, repair policy and contact details at stable addresses that people can bookmark and share. Choose channels the team has time to maintain.',
          ],
        ],
        example: 'One address for every poster',
        code: 'Audience     Students near campus\nMain task    Find the next Saturday repair session\nHome page    Date, time, venue and a link to visiting details\nSocial post  Short reminder linking to the home page',
        result:
          'When a session moves, the organiser updates its page once. A visitor following last month’s poster can still find the current time.',
        task: 'A food garden has a social account and wants volunteers. Choose two channels and specify the action each should support.',
        hint: 'Separate how a new volunteer discovers the garden from how they check what to bring.',
        solution:
          'Use social posts to advertise planting days. Link each post to a stable volunteer page with the meeting point, clothing advice and a sign-up link. Assign someone to update that page after each session.',
        quizzes: [
          question(
            'A venue moves twice a term. Which destination belongs on a printed poster?',
            [
              'A photograph of this week’s schedule',
              'A maintained page with the latest venue',
              'A private organiser chat',
            ],
            1,
            'The page can be updated while the printed address stays usable.',
          ),
          question(
            'Which requirement describes a visitor task?',
            [
              'Use three brand colours',
              'Buy the shortest domain',
              'Find the Saturday opening time on a phone',
            ],
            2,
            'It identifies what a person must be able to do and can be tested with a visitor.',
          ),
        ],
      },
      {
        slug: 'measure-success',
        title: 'Measure visitor and organisation goals',
        outcomes: 'LO3-4',
        sections: [
          [
            'Observe a real task',
            'User experience covers how easily someone can reach a goal. Ask five classmates to find the opening time on a phone without coaching. Record how many succeed, how long they take and which link they try first.',
          ],
          [
            'Measure the service',
            'Choose a measure connected to the organisation’s objective. If the café wants relevant enquiries, count completed repair enquiries as well as visits. Define the denominator and the date range so a comparison from one week to the next has meaning.',
          ],
        ],
        example: 'Two different rates',
        code: 'Mobile task test: 4 of 5 found the venue\nTask success = 4 / 5 × 100 = 80%\nWebsite this week: 12 enquiries in 200 visits\nEnquiries per 100 visits = 12 / 200 × 100 = 6',
        result:
          'The first figure describes five observed people. The second describes activity over a week. Ask the fifth tester where they looked for the venue before deciding which link to change.',
        task: 'Eight out of ten testers find the repair rules. The site receives 9 enquiries in 150 visits. Calculate both rates and suggest one follow-up.',
        hint: 'Identify the population for each measure before dividing.',
        solution:
          'Task success is 80%. There are 6 enquiries per 100 visits. Watch where the two unsuccessful testers look, then retest a clearer link label.',
        quizzes: [
          question(
            'Five people out of eight found the hours. What is the task success rate?',
            ['62.5%', '37.5%', '160%'],
            0,
            'Five divided by eight is 0.625.',
          ),
          question(
            'Which measure most directly answers whether visitors book sessions?',
            [
              'Number of colours on the form',
              'Confirmed bookings per 100 visits',
              'Size of the header image',
            ],
            1,
            'It measures a completed service action relative to traffic.',
          ),
        ],
      },
      {
        slug: 'web-languages',
        title: 'How HTML, CSS and JavaScript work together',
        outcomes: 'LO5',
        sections: [
          [
            'Structure, appearance and behaviour',
            'HTML marks up the heading, time and button. CSS selects those elements and changes their appearance. JavaScript can listen for an action and update what a person sees. The browser builds a document tree from the HTML that both CSS and JavaScript can address.',
          ],
          [
            'Start with accessible content',
            'Put essential session information in the HTML. A visitor can then read the time as soon as the document loads. Use JavaScript for an enhancement such as showing additional repair advice when someone presses a button.',
          ],
        ],
        example: 'Give one heading three roles',
        code: '<!-- index.html -->\n<h1 id="session">Saturday repair café</h1>\n\n/* site.css */\n#session { color: #14534b; }\n\n// site.js, loaded after the heading exists\nconst heading = document.querySelector("#session");\nheading.textContent = "Saturday repair café . 09:00";',
        result:
          'The heading is present in the HTML. The style gives it a colour. The script changes the text inside the same heading.',
        task: 'Assign a language to each change: add a directions link, put space above it, and show a message when a visitor presses a separate button.',
        hint: 'Ask which change creates an element, which affects its appearance and which waits for an event.',
        solution:
          'Use HTML for the anchor and its href. Use CSS margin for the spacing. Use a JavaScript click listener on the button to update a message.',
        quizzes: [
          question(
            'Which edit gives the browser a meaningful page heading?',
            [
              'Set a font size in CSS',
              'Use an h1 element in HTML',
              'Create an empty click listener',
            ],
            1,
            'The heading element supplies the document structure.',
          ),
          question(
            'A button must reveal today’s waiting time when pressed. Which language normally handles the event?',
            ['JavaScript', 'CSS', 'HTML metadata'],
            0,
            'JavaScript can listen for a click and update the relevant text.',
          ),
        ],
      },
      {
        slug: 'prepare-assets',
        title: 'Source, credit and optimise assets',
        outcomes: 'LO6-8',
        sections: [
          [
            'Keep an asset register',
            'List the logo, approved copy, photographs, diagrams and contact details the site needs. For every third-party asset, record the creator, source, licence or permission and any required credit. A search result is a lead. Check the terms on the original asset page.',
          ],
          [
            'Export for the space available',
            'Keep the original photo separately. Crop a copy to the subject, resize it and compare the exported file size and sharpness on a phone. Squoosh can resize and compress browser images. Use descriptive filenames and write alt text that conveys the image’s purpose in context.',
          ],
        ],
        example: 'Prepare a hero photograph',
        code: 'Source: café volunteer’s original photo\nPermission: approved by the photographer for this website\nMaster: workshop-original.jpg (4000 px wide)\nWeb copy: repair-table.webp (960 px wide)\nAlt: A volunteer inspects the loose plug on a desk lamp.',
        result:
          'The team keeps a record of where the image came from and can replace the smaller public copy without losing its original.',
        task: 'Choose one image you may use and prepare a web copy. Record the source, permissions, two file sizes and the alt text you would use.',
        hint: 'Your own drawing can fulfil the image requirement. For an external asset, check whether its terms allow your intended edit.',
        solution:
          'For an original drawing of the tool table, record your name and creation date. Export at the intended display size, compare both file sizes, then describe what a visitor needs to know about the table. Give a purely decorative image an empty alt attribute.',
        quizzes: [
          question(
            'Which entry best supports reuse of a third-party photo?',
            [
              'The first search result',
              'The file extension alone',
              'Creator, source, applicable licence and required credit',
            ],
            2,
            'Those details let the team check its use and provide the requested attribution.',
          ),
          question(
            'A photo will appear at 600 pixels wide. What is a sensible first test?',
            [
              'Export a smaller copy and compare detail and bytes',
              'Delete the original',
              'Rename .jpg to .webp',
            ],
            0,
            'Resizing and encoding change the actual file. Renaming an extension does not convert it.',
          ),
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Website files and Visual Studio Code',
    sessions: '7-9',
    goal: 'Set up the project folder and trace the paths a browser uses to find its pages, images and styles.',
    checkpoint:
      'Open the project folder in VS Code. Add a second page and check a link in each direction before the folder grows.',
    lessons: [
      {
        slug: 'files-paths',
        title: 'Organise folders and follow relative paths',
        outcomes: 'LO1-2',
        sections: [
          [
            'Work from one root folder',
            'Keep index.html at the site root. Group styles in css, scripts in js and images in images. A consistent lowercase naming scheme with hyphens makes paths easier to compare. Many hosts treat capital and lowercase letters differently.',
          ],
          [
            'Resolve a path from the file that uses it',
            'A relative HTML link starts at the current HTML file’s folder. A relative url() in an external stylesheet starts at the stylesheet’s folder. Each ../ moves up one level before the browser follows the rest of the path.',
          ],
        ],
        example: 'Link from a nested visiting page',
        code: 'repair-cafe/\n  index.html\n  pages/visit.html\n  css/site.css\n  images/tools.webp\n\n<!-- Inside pages/visit.html -->\n<link rel="stylesheet" href="../css/site.css">\n<a href="../index.html">Home</a>',
        result:
          'From pages/visit.html, the first ../ returns to repair-cafe. A link to css/site.css without that step would look for pages/css/site.css.',
        task: 'Write the path from index.html to pages/visit.html, from the visit page to images/tools.webp, and from css/site.css to the same image.',
        hint: 'Start each journey in the folder containing the referencing file.',
        solution:
          'From the home page use pages/visit.html. From the visit page use ../images/tools.webp. Inside the stylesheet use url("../images/tools.webp").',
        quizzes: [
          question(
            'Inside pages/visit.html, which href reaches the home page?',
            ['index.html', '../index.html', 'pages/index.html'],
            1,
            'The home page is one level above pages.',
          ),
          question(
            'An HTML image works locally but fails on a case-sensitive host. Which pair should you compare?',
            [
              'Browser colour and font',
              'Image width and screen width',
              'The exact filename and the src value',
            ],
            2,
            'A difference such as Tools.webp versus tools.webp can break a path on the host.',
          ),
        ],
      },
      {
        slug: 'vscode-workflow',
        title: 'Create and preview a project in VS Code',
        outcomes: 'LO3-4',
        sections: [
          [
            'Start in the Explorer',
            'Create a folder called repair-cafe, then choose File > Open Folder in VS Code. Use the Explorer to add index.html and css/site.css. Save the files. For this simple static exercise, open index.html in your browser and refresh it after each change.',
          ],
          [
            'Read the completion before accepting it',
            'In an HTML file, type an Emmet abbreviation and choose its expansion from the suggestions. For example, nav>ul>li*2 creates a navigation element containing a list of two items. Attribute suggestions and closing-tag completion help while typing. Inspect the result and add meaningful link text.',
          ],
        ],
        example: 'Expand a two-link menu',
        code: 'Emmet: nav>ul>li*2>a\n\n<nav>\n  <ul>\n    <li><a href="index.html">Home</a></li>\n    <li><a href="pages/visit.html">Plan a visit</a></li>\n  </ul>\n</nav>',
        result:
          'The abbreviation creates the nested elements. You supply the destinations and the labels people will use.',
        task: 'Create a new folder, expand an HTML document skeleton, and add the heading “Repair sessions”. Change the heading and verify the change in the browser.',
        hint: 'Give the file an .html extension so the editor knows which language suggestions to offer.',
        solution:
          'Open the project folder, add index.html, type ! and choose Emmet’s HTML expansion. Add an h1 in body, save and refresh the browser. Edit that same heading, save again and confirm that the tab displays the latest file.',
        quizzes: [
          question(
            'You typed an Emmet abbreviation into notes.txt. What should you check first?',
            [
              'The browser zoom',
              'The image size',
              'The editor language mode or file extension',
            ],
            2,
            'HTML completions depend on the editor recognising the file as HTML.',
          ),
          question(
            'The browser shows yesterday’s heading. Which check is most direct?',
            [
              'Save the file, check its path and refresh the open page',
              'Rename every folder',
              'Install a new font',
            ],
            0,
            'This verifies that the browser is showing the same saved file you edited.',
          ),
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Introduction to HTML',
    sessions: '10-19',
    goal: 'Build a linked, semantic website and verify that text, media and forms have a sensible reading order.',
    checkpoint:
      'Complete the HTML pages for the practice café. Include working navigation, a schedule table, a labelled enquiry form and an accessible media example. Validate each page.',
    lessons: [
      {
        slug: 'html-dom',
        title: 'Read HTML syntax and the document tree',
        outcomes: 'LO1-5',
        sections: [
          [
            'Read an element',
            'A tag marks a boundary in the source. An element includes its tags and content. An attribute adds a named value inside the opening tag. A URL identifies a resource. The document type declaration selects standard HTML rendering. In the root html element, head holds metadata and body holds visible content.',
          ],
          [
            'Follow the tree',
            'The browser parses the markup into the Document Object Model (DOM). A section can contain a heading and a paragraph as children. In the paragraph, a link can be a grandchild of the section. Indent nested content so that you can see this relationship in the source.',
          ],
          [
            'Keep meaning in the document',
            'Use headings for headings and CSS for their colour. Old presentational markup such as the obsolete font element mixes these jobs. Replace it with a semantic element and a stylesheet rule, then validate the HTML.',
          ],
        ],
        example: 'Identify a parent and a sibling',
        code: '<main>\n  <section>\n    <h2>Saturday repairs</h2>\n    <p>Read the <a href="visit.html">visiting guide</a>.</p>\n  </section>\n</main>',
        result:
          'The section is the parent of h2 and p. The two are siblings. The paragraph is the immediate parent of the link.',
        task: 'Sketch the tree in the example, then replace a legacy font tag around a heading with structural HTML and a separate CSS rule.',
        hint: 'The closest element enclosing the anchor is its parent. Choose a heading level that fits the page outline.',
        solution:
          'The tree is main > section with h2 and p as children, then a inside p. Use <h2 class="session">Saturday repairs</h2> and .session { color: #14534b; }.',
        quizzes: [
          question(
            'In <p>Read <a href="visit.html">this guide</a></p>, what is href?',
            ['An attribute on a', 'A child of p', 'A closing tag'],
            0,
            'The href attribute supplies the anchor’s destination.',
          ),
          question(
            'Which edit keeps meaning and styling separate?',
            [
              'Add a font tag for each heading',
              'Use h2 for the heading and CSS for its colour',
              'Turn all headings into images',
            ],
            1,
            'The heading remains available to a browser or screen reader even when the style changes.',
          ),
        ],
      },
      {
        slug: 'html-elements',
        title: 'Use semantic elements, media, tables and forms',
        outcomes: 'LO6-12',
        sections: [
          [
            'Choose an element by its purpose',
            'Use header, nav, main and footer for major regions, headings for structure, and lists for groups of items. In normal flow a paragraph starts a block, while an anchor inside it flows with the surrounding words. CSS can change display. Indent nested markup and use meaningful text for each link.',
          ],
          [
            'Describe data and media',
            'Mark table headers with th and scope, and use a caption for the table’s subject. Give an image a useful alt value and actual width and height when known. Use controls on audio or video, supply a transcript or captions as appropriate, and title an iframe so people can identify the embedded resource.',
          ],
          [
            'Let someone answer',
            'Associate each label’s for value with the control’s id. A control’s name identifies its value when a form is submitted. Use an appropriate type such as email, and a submit button. Confirm that each field and link can be reached with a keyboard.',
          ],
        ],
        example: 'A short timetable with a named enquiry field',
        code: '<table>\n  <caption>Saturday timetable</caption>\n  <tr><th scope="col">Time</th><th scope="col">Activity</th></tr>\n  <tr><td>09:00</td><td>Tool checks</td></tr>\n</table>\n<form action="/enquiries" method="post">\n  <label for="email">Your email</label>\n  <input id="email" type="email" name="email" required>\n  <button type="submit">Send enquiry</button>\n</form>',
        result:
          'The caption identifies the table, and the two column headers describe the values in the next row. The form example assumes that /enquiries is a server route that accepts submissions.',
        task: 'Add a purposefully labelled link, a local image and a video with controls. Write an iframe for a local directions page and give it a title.',
        hint: 'Use href for a link and src for media. Match asset names to files you actually have.',
        solution:
          '<a href="visit.html">Plan your visit</a>\n<img src="images/bench.webp" alt="Repair table beside the north entrance">\n<video controls src="media/tour.mp4"></video>\n<a href="tour-transcript.html">Read the tour transcript</a>\n<iframe src="directions.html" title="Directions to the north entrance"></iframe>\nAdd a captions track if the recording contains spoken instructions.',
        quizzes: [
          question(
            'Which attribute lets a reader identify a directions iframe?',
            ['name on the body', 'title on the iframe', 'width on the nav'],
            1,
            'A short descriptive title names the embedded content.',
          ),
          question(
            'A tagged input displays correctly but its value has no field name in submission. What is missing?',
            ['width', 'class', 'name'],
            2,
            'The name attribute supplies the submitted key.',
          ),
        ],
      },
      {
        slug: 'build-validate',
        title: 'Build linked pages and validate the HTML',
        outcomes: 'LO13-18',
        sections: [
          [
            'Start with a working route',
            'Create index.html, visit.html and enquiry.html in one project, each with a language, a unique title, a main heading and the same navigation links. Add the current page marker to the matching link. Once the route works, add a form and a meaningful embed.',
          ],
          [
            'Validate and test separately',
            'Use the Nu HTML Checker to validate each complete document by direct input or upload. Correct the first structural error, run the check again, then fix the next issue. Open every link, try keyboard navigation and submit a test form. A page can pass markup validation while a link points to a missing file.',
          ],
        ],
        example: 'A small valid document',
        code: '<!doctype html>\n<html lang="en">\n  <head><meta charset="utf-8"><title>Visit the repair café</title></head>\n  <body>\n    <nav><a href="index.html">Home</a> <a href="visit.html" aria-current="page">Visit</a></nav>\n    <main><h1>Plan your visit</h1><p>Bring your item and its plug.</p></main>\n  </body>\n</html>',
        result:
          'The browser tab identifies the visit page. The navigation names the current page. Opening Home tests whether the linked file exists at the expected path.',
        task: 'Make two pages link to each other. Add a form or embed to the second page. Deliberately duplicate an id, validate, fix it, then test both links.',
        hint: 'Keep ids unique within each document. In a nested folder, recheck relative paths in both directions.',
        solution:
          'Use unique ids such as visitor-name and visitor-email. Update the corresponding for attributes. Save the clean checker result, then record the start page, clicked label and destination for both navigation tests.',
        quizzes: [
          question(
            'The validator finds duplicate ids. What should be updated along with a renamed input id?',
            [
              'The logo filename',
              'The matching label’s for attribute',
              'The page language',
            ],
            1,
            'The label and its control need matching for and id values.',
          ),
          question(
            'Markup validation passes, but Visit opens a 404. What should you inspect?',
            [
              'The href path and the deployed filename',
              'The heading font',
              'The doctype letter case',
            ],
            0,
            'A valid href can still point to a file that does not exist.',
          ),
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Styling websites with CSS',
    sessions: '20-27',
    goal: 'Give the café pages a consistent visual style and explain why a particular CSS declaration wins.',
    checkpoint:
      'Link the same stylesheet from every page. Style headings, navigation, focus indicators, form controls and the page layout, then inspect one rule in the browser.',
    lessons: [
      {
        slug: 'css-cascade',
        title: 'Link a stylesheet and trace the cascade',
        outcomes: 'LO1-8',
        sections: [
          [
            'Write and attach a rule',
            'In .notice { color: navy; }, .notice is the selector and color: navy is a declaration with a property and value. An external stylesheet can serve several pages. A style element applies to one document. A style attribute applies directly to one element. Keep shared typography, decoration and layout in the external sheet.',
          ],
          [
            'Match the right elements',
            'A type selector targets an element name (p). A class (.notice) can be reused, and an ID (#hours) identifies one element. A descendant selector (nav a) targets links inside nav. An attribute selector (input[required]) targets elements by an attribute. Use a div to group blocks and a span for a short piece of text when a specific semantic element does not fit.',
          ],
          [
            'Trace the winner and its units',
            'For ordinary author rules in the same layer, compare specificity before source order. When specificity ties, the later declaration wins. Some properties, such as color, inherit from a parent if the child has no winning value of its own. Use rem for text or spacing relative to the root font, % for proportions and px for fine details such as borders.',
          ],
        ],
        example: 'Which colour reaches the notice?',
        code: '<!-- In the head of both pages -->\n<link rel="stylesheet" href="css/site.css">\n\n/* In css/site.css */\nmain { color: #24332e; }\n.notice { color: green; }\n.notice { color: navy; }\np { color: maroon; }',
        result:
          'A paragraph with class notice is navy. Both class selectors outrank p and the second class rule wins the tie. The paragraph’s own colour also takes precedence over a value inherited from main.',
        task: 'Style every heading using one rule, all notices using a second rule and only the navigation links using a third. Explain one case in which a later rule loses.',
        hint: 'A class selector has more specificity than a single element selector.',
        solution:
          'h2 { font-size: 1.5rem; }\n.notice { color: navy; }\nnav a { text-decoration: underline; }\nA later p { color: maroon; } loses to .notice on a paragraph with that class when both rules have the same origin, importance and layer.',
        quizzes: [
          question(
            'Two .notice rules set different colours in the same stylesheet and layer. Which wins?',
            ['The first one', 'The later one', 'The one with the longer colour name'],
            1,
            'With equal priority and specificity, source order resolves the tie.',
          ),
          question(
            'Which selector addresses only the links inside nav?',
            ['nav a', 'nav, a', 'a'],
            0,
            'The space means that the anchor must be a descendant of nav.',
          ),
        ],
      },
      {
        slug: 'css-layout',
        title: 'Style boxes, type, links and layout',
        outcomes: 'LO9-16',
        sections: [
          [
            'Measure the box',
            'From the centre out, a CSS box has content, padding, border and margin. With content-box, padding and border add to the declared width. With border-box, the declared width includes both. Margin remains outside. Background and border can decorate a card while line height and a readable font shape its typography.',
          ],
          [
            'Use colour and link states',
            'A colour can be expressed as a name, a hexadecimal value or an rgb() value. The navy colour is also #000080 or rgb(0, 0, 128). Style :hover and :focus-visible so a keyboard user can find the same link. Give a web font a local fallback, such as system-ui or sans-serif.',
          ],
          [
            'Position elements deliberately',
            'Normal flow places elements in document order. Flexbox arranges items along one main axis. Grid aligns content in rows and columns. A relatively positioned parent can anchor an absolutely positioned badge. Fixed elements use the viewport in the usual case. Sticky positioning keeps an item in flow until its scroll threshold is reached.',
          ],
        ],
        example: 'Predict a card’s outside width',
        code: '.card {\n  box-sizing: border-box;\n  width: 240px;\n  padding: 16px;\n  border: 2px solid navy;\n  margin: 8px;\n  font: 1rem/1.5 system-ui, sans-serif;\n}\nnav a:focus-visible { outline: 3px solid navy; }',
        result:
          'The border box measures 240 pixels. Subtract two paddings and two borders to get 204 pixels for the content. The horizontal margins bring the total space to 256 pixels.',
        task: 'Predict the total horizontal space for the same card with content-box. Then use the StudyLab box model tool to check both versions.',
        hint: 'Count the left and right padding, border and margin exactly once each.',
        solution:
          'With content-box the content takes 240 px. The border box uses 240 + 32 + 4 = 276 px. The outer space is 276 + 16 = 292 px. With border-box the outer space is 240 + 16 = 256 px.',
        quizzes: [
          question(
            'With content-box, a 100px width, 10px of padding and a 2px border on each side, how wide is the box including its borders?',
            ['100px', '112px', '124px'],
            2,
            'Add 20px of padding and 4px of border to the declared content width.',
          ),
          question(
            'Which choice suits a layout that aligns cards by both rows and columns?',
            ['Grid', 'A different font', 'The :visited pseudo-class'],
            0,
            'Grid gives a layout explicit rows and columns.',
          ),
        ],
      },
      {
        slug: 'css-devtools',
        title: 'Debug a shared stylesheet with DevTools',
        outcomes: 'LO17-18',
        sections: [
          [
            'Inspect before editing',
            'Open the browser’s developer tools and select the element. In Styles, look at the selectors that match and any crossed-out declarations. In Computed, read the resulting value. If no stylesheet rule appears, check the Network panel for the stylesheet URL and response.',
          ],
          [
            'Save a reproducible fix',
            'Try a change in the inspector to test your idea. Then make the change in the shared stylesheet, save, and reload both pages. Inspect the navigation with a keyboard, including a link with focus. Record the selector, the original symptom and the result after the fix.',
          ],
        ],
        example: 'The gap appears only on one page',
        code: 'Home document: index.html\nStylesheet URL: css/site.css        -> loaded\nVisit document: pages/visit.html\nStylesheet URL: css/site.css        -> looked in pages/css/\nCorrect href: ../css/site.css',
        result:
          'The same CSS works on both pages once each link resolves to the same stylesheet. Changing the selector would have left the missing request unresolved.',
        task: 'Give two pages a common navigation style. In the inspector, try a larger gap between links. Make the change permanent and verify it on both pages.',
        hint: 'Select the navigation container and inspect its computed gap and display values.',
        solution:
          'In site.css use nav { display: flex; flex-wrap: wrap; gap: 1rem; }. Link the sheet from the correct folder on each page. Refresh both pages and inspect the computed gap.',
        quizzes: [
          question(
            'A declaration is crossed out in Styles. What should you examine next?',
            [
              'Which competing declaration won',
              'Whether the computer has a mouse',
              'The image licence',
            ],
            0,
            'DevTools shows the winning rule so you can trace the cascade.',
          ),
          question(
            'A style changed in DevTools disappears on refresh. How do you keep the change?',
            [
              'Increase browser zoom',
              'Change the tab title',
              'Save it in the project stylesheet',
            ],
            2,
            'Normal inspector edits affect the current document until it reloads.',
          ),
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Responsive web design',
    sessions: '28-33',
    goal: 'Keep the timetable and enquiry link usable from a narrow phone to a wide desktop.',
    checkpoint:
      'Test a single-column base layout, a wider layout and the widths just below and at your breakpoint. Record what changes and why.',
    lessons: [
      {
        slug: 'responsive-layout',
        title: 'Build a mobile-first layout and test breakpoints',
        outcomes: 'LO1-4',
        sections: [
          [
            'Design for small screens first',
            'Start with the content visitors need on a narrow screen. Relative widths and flexible images allow the same layout to respond continuously. An adaptive design can instead select from several discrete layouts. A responsive page can still use breakpoints for deliberate changes.',
          ],
          [
            'Choose a breakpoint from the content',
            'Add the viewport meta tag so mobile browsers use the device width for layout. Start with one column. Widen the page until two cards can fit without crowding, then add a min-width media query. Test one pixel below the threshold, exactly at it and above it.',
          ],
          [
            'Find what overflows',
            'Try long headings, wide media and keyboard navigation. Set images to max-width: 100% and height: auto to preserve aspect ratio. Let data tables scroll inside their own container when a narrow screen cannot show every column.',
          ],
        ],
        example: 'Switch from one column to two',
        code: '<!-- In the HTML head -->\n<meta name="viewport" content="width=device-width, initial-scale=1">\n\n/* In the stylesheet */\n.sessions { display: grid; gap: 1rem; grid-template-columns: 1fr; }\nimg { max-width: 100%; height: auto; }\n@media (min-width: 640px) {\n  .sessions { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n}',
        result:
          'At 639 CSS pixels the grid has one column. At 640 pixels it has two. A long title or a wide image can still cause overflow, so try both when you test.',
        task: 'Make two session cards stack at 360px and sit side by side from 640px. Record what is visible at 639px, 640px and 900px.',
        hint: 'Set the narrow layout outside the media query so it works without any minimum width condition.',
        solution:
          'Use a single 1fr column first. In @media (min-width: 640px) set repeat(2, minmax(0, 1fr)). The expected column counts are 1, 2 and 2. Check that the enquiry button remains visible and reachable at each width.',
        quizzes: [
          question(
            'A min-width: 640px rule applies at which width?',
            ['Only 641px and above', '640px and above', 'Only at 640px'],
            1,
            'The minimum is inclusive.',
          ),
          question(
            'Which observation gives the best reason to add a breakpoint?',
            [
              'The layout has space for two cards while both remain readable',
              'A phone brand released a new model',
              'The CSS file has fifty lines',
            ],
            0,
            'A content-based breakpoint follows what fits in the layout.',
          ),
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Building functionality into websites',
    sessions: '34-42',
    goal: 'Add a small JavaScript enhancement and choose how to collect a visitor’s response.',
    checkpoint:
      'Show a valid and an invalid enquiry. Explain where the data goes for a local demonstration, a form with a server endpoint and a published Google Form.',
    lessons: [
      {
        slug: 'javascript-jquery',
        title: 'Use JavaScript and jQuery for page behaviour',
        outcomes: 'LO1-6',
        sections: [
          [
            'Read a short script',
            'A variable holds a value. Strings hold text, numbers support arithmetic and booleans represent true or false. A function groups instructions and may accept parameters or return a value. An if statement chooses a branch. A loop repeats a block for a collection of values.',
          ],
          [
            'Connect the script to the document',
            'Load an external script using defer so it can select elements after HTML parsing. Use new Date().getFullYear() to update a year label. To respond to a button, attach a click listener and update the textContent of a message element.',
          ],
          [
            'Read an existing jQuery snippet',
            'jQuery is a JavaScript library. In a project that uses it, load the library before the dependent script, both in dependency order. The $ function can select elements. The .on() method attaches an event handler, and .text() updates the matched text.',
          ],
        ],
        example: 'List available sessions and stamp the year',
        code: '// In site.js; the page has elements #spaces and #year.\nfunction available(counts) {\n  let total = 0;\n  for (const count of counts) {\n    if (count > 0) total += count;\n  }\n  return total;\n}\ndocument.querySelector("#spaces").textContent = available([2, 0, 3]);\ndocument.querySelector("#year").textContent = new Date().getFullYear();',
        result:
          'The count is 5. A zero adds no spaces. The year comes from the visitor’s device when the page loads. Test the function again with an empty array and with all zeroes.',
        task: 'On a page with a button #rules and a paragraph #message, use a jQuery click handler to display “Bring one item”. Describe the script order.',
        hint: 'Load jQuery before your file, then select the button and listen for click.',
        solution:
          '<script defer src="js/jquery.min.js"></script>\n<script defer src="js/site.js"></script>\n\n// In site.js, with the jQuery file present at the path above:\n$("#rules").on("click", function () {\n  $("#message").text("Bring one item");\n});',
        quizzes: [
          question(
            'What does available([0, 4, 1]) return in the example?',
            ['4', '3', '5'],
            2,
            'The loop includes the positive values 4 and 1.',
          ),
          question(
            'A snippet calls $ before jQuery loads. Which change fixes the dependency?',
            [
              'Load jQuery first, then the dependent script',
              'Rename the CSS class',
              'Add a second body tag',
            ],
            0,
            'The library must define $ before the snippet calls it.',
          ),
        ],
      },
      {
        slug: 'forms-responses',
        title: 'Validate forms, embed Google Forms and collect responses',
        outcomes: 'LO7-13',
        sections: [
          [
            'Follow a local form submission',
            'Labels and named fields make a form usable. The action is the receiving URL and the method controls how the browser sends data. A field with type="email" and required can catch basic input mistakes. A real receiving service must also validate the values. A local HTML file alone cannot store visitor enquiries on a server.',
          ],
          [
            'Add a meaningful validation rule',
            'A required text field can still contain spaces. Trim its value, set a custom validity message when it is too short, clear that message when the user corrects it, then ask the browser to report validity. In a local demonstration, prevent submission and label the resulting message as a preview.',
          ],
          [
            'Collect and route hosted responses',
            'Create a Google Form, add the questions and check the responder access. Publish it, obtain the embed HTML and insert it into your own page with an informative iframe title. Open the responder view and submit a fictional test entry. In Responses, enable new-response emails and link a Google Sheet to collate answers. To send respondents their own answers, collect email addresses and enable response copies in Settings. For a team inbox, arrange an approved notification or mail-forwarding rule, then test its delivery.',
          ],
        ],
        example: 'Check a repair description in the local demo',
        code: '// Use with <form id="enquiry">, textarea#item and p#status.\nconst form = document.querySelector("#enquiry");\nconst item = document.querySelector("#item");\nitem.addEventListener("input", () => item.setCustomValidity(""));\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  item.setCustomValidity(item.value.trim().length < 5\n    ? "Describe the item in at least five characters." : "");\n  if (form.reportValidity()) {\n    document.querySelector("#status").textContent = "Preview accepted locally.";\n  }\n});',
        result:
          'Five spaces fail the custom rule. A description such as “desk lamp” passes. This demonstration displays a local acknowledgement. Connect an actual receiver or a published hosted form to collect submissions.',
        task: 'Test blank, whitespace-only and valid descriptions. Then use a disposable Google Form to record one fictional response, confirm its sheet row and test a response notification.',
        hint: 'On the form editor’s Responses tab, look for the Sheets destination and the new-response email option in its menu.',
        solution:
          'Blank and spaces-only descriptions must prompt a correction. “Loose lamp plug” passes. For the hosted form, submit from the responder link, locate the matching response row and confirm that the chosen mailbox received the notification. Keep test entries fictional.',
        quizzes: [
          question(
            'A local form calls preventDefault() and writes a success message. Where is that response sent?',
            [
              'To the developer automatically',
              'Nowhere unless code separately sends it',
              'To Google Sheets automatically',
            ],
            1,
            'Changing page text does not transmit or persist a response.',
          ),
          question(
            'Which test confirms that hosted form collection works?',
            [
              'Change the submit button colour',
              'Open the editor preview only',
              'Submit a test entry as a responder and find its response row',
            ],
            2,
            'This checks the path from the visitor’s form through to its response destination.',
          ),
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'SEO, publishing and maintenance',
    sessions: '43-48',
    goal: 'Publish a discoverable website, test its public pages and use evidence to decide what to improve.',
    checkpoint:
      'Prepare a release record with the site address, a successful navigation and form test, a title and description review, a metric and a maintenance owner.',
    lessons: [
      {
        slug: 'search-optimisation',
        title: 'Help visitors and search engines find a page',
        outcomes: 'LO1-3',
        sections: [
          [
            'Answer a specific search',
            'Search engine optimisation helps search engines find and understand pages that may answer a visitor’s query. Give each page an informative title, a clear main heading and useful text about its subject. Use internal links with descriptive labels so people and crawlers can follow the site.',
          ],
          [
            'Write an accurate search description',
            'Write a concise, page-specific description. A search engine may use it in a result or choose text from the page. Use meaningful filenames, relevant alternative text and crawlable links. Genuine references from other relevant organisations can help people discover the site.',
          ],
        ],
        example: 'Make the visit page recognisable',
        code: '<title>Saturday repair sessions in Mankweng | Campus Repair Café</title>\n<meta name="description" content="Find Saturday repair times, the meeting point and what to bring to the campus repair café in Mankweng.">\n<h1>Plan your Saturday repair visit</h1>\n<a href="enquiry.html">Ask about an item for repair</a>',
        result:
          'Someone looking through browser tabs or search results can identify the page’s purpose. The visible content should actually supply the promised time, location and instructions.',
        task: 'Rewrite the title “Welcome” and a “Click here” link for a page about volunteer shifts. State what a visitor should find after following the link.',
        hint: 'Include the distinct task or location. Keep the words natural and specific.',
        solution:
          'Title: “Volunteer repair shifts in Mankweng | Campus Repair Café”. Link: “View Saturday volunteer shifts”. The destination should list shift times, roles and a way to enquire.',
        quizzes: [
          question(
            'Which title most clearly identifies the visiting page?',
            ['Site', 'Welcome', 'Repair café opening times and directions'],
            2,
            'It identifies the purpose of this particular page.',
          ),
          question(
            'What can happen to the page’s meta description in search?',
            [
              'It fixes the ranking',
              'The search engine may use it or select a different snippet',
              'It replaces the visible h1',
            ],
            1,
            'The search engine selects display text according to the page and query.',
          ),
        ],
      },
      {
        slug: 'publish-test',
        title: 'Choose a domain, publish and test a website',
        outcomes: 'LO4-6',
        sections: [
          [
            'Choose a publishing method',
            'A host’s file manager can upload files through a browser. An FTP client such as FileZilla transfers a folder of files to a host. A repository deployment can publish a tested commit. Some site builders package publishing behind a Publish button. Identify the public folder and index file for the method you choose.',
          ],
          [
            'Connect a domain and hosting',
            'A domain is the name visitors type. Hosting serves the files. Check availability, spelling and renewal terms, register the name, then enter the DNS records supplied by your host. Confirm that the address loads the expected site over HTTPS after the records take effect.',
          ],
          [
            'Transfer and verify',
            'FTP stands for File Transfer Protocol. If the host offers SFTP, use that separate encrypted protocol in the FileZilla Site Manager. Use the host-provided settings, verify the server identity, find the designated public directory, then upload the contents of the site folder. Open the public URL and test nested pages, images, mobile layout and the enquiry path.',
          ],
        ],
        example: 'Trace a broken live image',
        code: 'Requested: /images/repair-table.webp\nPublished: /images/Repair-Table.webp\nFix: match the source path and filename exactly.\nRetest: open the image URL, then reload the visit page.',
        result:
          'Checking the requested public path distinguishes an incomplete upload from a spelling or case error. Record the public address and the revision you tested.',
        task: 'Prepare a release checklist for a static site. Include one test that opens a nested page directly and another that confirms form behaviour.',
        hint: 'A successful home page tests only the home page. Try a bookmarked deep link and a realistic form action.',
        solution:
          'Confirm index.html is at the published root. Open the home page and the direct visit URL over HTTPS. Check an image, navigate both ways, test at a narrow width and verify that a real submission reaches its intended receiver or that a demo is clearly labelled.',
        quizzes: [
          question(
            'Which service normally stores and serves the website files?',
            ['The hosting provider', 'A CSS selector', 'A browser bookmark'],
            0,
            'Hosting serves the content. A domain gives people a name to reach it.',
          ),
          question(
            'After an upload, what tests the public copy most directly?',
            [
              'Reading the project folder name',
              'Opening index.html on your own disk',
              'Opening the public URL and testing a nested page and its assets',
            ],
            2,
            'That checks the path visitors actually use.',
          ),
        ],
      },
      {
        slug: 'analytics-maintenance',
        title: 'Interpret analytics and maintain the site',
        outcomes: 'LO7-9',
        sections: [
          [
            'Choose measurements for the goal',
            'Analytics summarises activity such as visits, popular landing pages and completed actions. Define the action you want first. If the aim is repair bookings, compare visits, enquiry starts and successful submissions over the same period.',
          ],
          [
            'Investigate the gap',
            'A drop between form starts and completions gives you a question to investigate. Try the form on a phone, inspect errors and watch a test user. Counts alone cannot tell you which field caused the drop. Change one well-supported issue and measure again over comparable dates.',
          ],
          [
            'Assign maintenance work',
            'Keep session dates and contacts current, test links and forms, review accessibility and check that backups can be restored. Document what changed, who owns the next check and when it is due. Test a release before and after publication.',
          ],
        ],
        example: 'Use comparable denominators',
        code: 'Period A: 20 form starts, 8 completed  = 40% of starts\nPeriod B: 30 form starts, 15 completed = 50% of starts\nChange in completion rate              = 10 percentage points',
        result:
          'Period B had more starts and a higher completion rate. That observation alone does not establish that a particular design change caused the increase.',
        task: 'One week has 25 starts and 10 completions. The next has 40 starts and 12 completions. Compare the two rates and propose a maintenance check.',
        hint: 'Calculate completions divided by starts before comparing the raw counts.',
        solution:
          'The rates are 40% and 30%. Completed enquiries grew by two, while the share of starts that finished fell by 10 percentage points. Test the mobile form and inspect any delivery failures before choosing a fix.',
        quizzes: [
          question(
            'If 6 of 24 form starts complete, what is the completion rate?',
            ['4%', '25%', '75%'],
            1,
            'Six divided by 24 is one quarter.',
          ),
          question(
            'Which action checks the café’s ability to recover after a bad release?',
            [
              'Count the images',
              'Increase heading size',
              'Restore a backup to a test location and verify the pages',
            ],
            2,
            'A test restore shows whether the saved files can actually rebuild the service.',
          ),
        ],
      },
    ],
  },
];

export const wedeLessons = wedeUnits.flatMap((unit) =>
  unit.lessons.map((lesson) => ({ ...lesson, id: 'wede-' + lesson.slug, unit: unit.id })),
);
