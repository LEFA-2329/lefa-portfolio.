// Five fictional practice datasets. Keep schema, records, examples and grading fixtures together.
export const additionalDatasets = {
  library: {
    title: 'Library',
    description:
      'Fictional library: 8 members, 12 titles and 24 loans. Includes unreturned loans, repeat borrowers and a member with no loans.',
    tables: {
      Members: ['MemberID (PK)', 'MemberName', 'City'],
      Titles: ['TitleID (PK)', 'TitleName', 'Category'],
      Loans: [
        'LoanID (PK)',
        'MemberID (FK: Members)',
        'TitleID (FK: Titles)',
        'LoanDate',
        'ReturnDate (nullable)',
      ],
    },
    rowCounts: {
      Members: 8,
      Titles: 12,
      Loans: 24,
    },
    sql: "CREATE TABLE Members (MemberID INTEGER PRIMARY KEY, MemberName VARCHAR(60) NOT NULL, City VARCHAR(60) NOT NULL);\nINSERT INTO Members (MemberID, MemberName, City) VALUES (1, 'Member 01', 'Pretoria'),\n(2, 'Member 02', 'Johannesburg'),\n(3, 'Member 03', 'Polokwane'),\n(4, 'Member 04', 'Pretoria'),\n(5, 'Member 05', 'Johannesburg'),\n(6, 'Member 06', 'Polokwane'),\n(7, 'Member 07', 'Pretoria'),\n(8, 'Member 08', 'Johannesburg');\nCREATE TABLE Titles (TitleID INTEGER PRIMARY KEY, TitleName VARCHAR(100) NOT NULL, Category VARCHAR(40) NOT NULL);\nINSERT INTO Titles (TitleID, TitleName, Category) VALUES (1, 'Library Title 01', 'Fiction'),\n(2, 'Library Title 02', 'History'),\n(3, 'Library Title 03', 'Computing'),\n(4, 'Library Title 04', 'Fiction'),\n(5, 'Library Title 05', 'History'),\n(6, 'Library Title 06', 'Computing'),\n(7, 'Library Title 07', 'Fiction'),\n(8, 'Library Title 08', 'History'),\n(9, 'Library Title 09', 'Computing'),\n(10, 'Library Title 10', 'Fiction'),\n(11, 'Library Title 11', 'History'),\n(12, 'Library Title 12', 'Computing');\nCREATE TABLE Loans (LoanID INTEGER PRIMARY KEY, MemberID INTEGER NOT NULL REFERENCES Members(MemberID), TitleID INTEGER NOT NULL REFERENCES Titles(TitleID), LoanDate DATE NOT NULL, ReturnDate DATE);\nINSERT INTO Loans (LoanID, MemberID, TitleID, LoanDate, ReturnDate) VALUES (1, 1, 1, '2026-10-01', '2026-11-01'),\n(2, 2, 2, '2026-10-02', '2026-11-02'),\n(3, 3, 3, '2026-10-03', NULL),\n(4, 4, 4, '2026-10-04', '2026-11-04'),\n(5, 5, 5, '2026-10-05', '2026-11-05'),\n(6, 6, 6, '2026-10-06', NULL),\n(7, 7, 7, '2026-10-07', '2026-11-07'),\n(8, 1, 8, '2026-10-08', '2026-11-08'),\n(9, 2, 9, '2026-10-09', NULL),\n(10, 3, 10, '2026-10-10', '2026-11-10'),\n(11, 4, 1, '2026-10-11', '2026-11-11'),\n(12, 5, 2, '2026-10-12', NULL),\n(13, 6, 3, '2026-10-13', '2026-11-13'),\n(14, 7, 4, '2026-10-14', '2026-11-14'),\n(15, 1, 5, '2026-10-15', NULL),\n(16, 2, 6, '2026-10-16', '2026-11-16'),\n(17, 3, 7, '2026-10-17', '2026-11-17'),\n(18, 4, 8, '2026-10-18', NULL),\n(19, 5, 9, '2026-10-19', '2026-11-19'),\n(20, 6, 10, '2026-10-20', '2026-11-20'),\n(21, 7, 1, '2026-10-01', NULL),\n(22, 1, 2, '2026-10-02', '2026-11-02'),\n(23, 2, 3, '2026-10-03', '2026-11-03'),\n(24, 3, 4, '2026-10-04', NULL);",
  },
  clinic: {
    title: 'Clinic Appointments',
    description:
      'Fictional scheduling only: 8 patients, 4 clinicians and 24 appointments. No medical histories. Includes cancelled appointments, NULL notes and a patient with no appointments.',
    tables: {
      Patients: ['PatientID (PK)', 'PatientName', 'City'],
      Clinicians: ['ClinicianID (PK)', 'ClinicianName', 'Department'],
      Appointments: [
        'AppointmentID (PK)',
        'PatientID (FK: Patients)',
        'ClinicianID (FK: Clinicians)',
        'AppointmentDate',
        'Status',
        'BookingNote (nullable)',
      ],
    },
    rowCounts: {
      Patients: 8,
      Clinicians: 4,
      Appointments: 24,
    },
    sql: "CREATE TABLE Patients (PatientID INTEGER PRIMARY KEY, PatientName VARCHAR(60) NOT NULL, City VARCHAR(60) NOT NULL);\nINSERT INTO Patients (PatientID, PatientName, City) VALUES (1, 'Patient 01', 'Pretoria'),\n(2, 'Patient 02', 'Polokwane'),\n(3, 'Patient 03', 'Pretoria'),\n(4, 'Patient 04', 'Polokwane'),\n(5, 'Patient 05', 'Pretoria'),\n(6, 'Patient 06', 'Polokwane'),\n(7, 'Patient 07', 'Pretoria'),\n(8, 'Patient 08', 'Polokwane');\nCREATE TABLE Clinicians (ClinicianID INTEGER PRIMARY KEY, ClinicianName VARCHAR(60) NOT NULL, Department VARCHAR(50) NOT NULL);\nINSERT INTO Clinicians (ClinicianID, ClinicianName, Department) VALUES (1, 'Clinician 01', 'General'),\n(2, 'Clinician 02', 'Dental'),\n(3, 'Clinician 03', 'Wellness'),\n(4, 'Clinician 04', 'General');\nCREATE TABLE Appointments (AppointmentID INTEGER PRIMARY KEY, PatientID INTEGER NOT NULL REFERENCES Patients(PatientID), ClinicianID INTEGER NOT NULL REFERENCES Clinicians(ClinicianID), AppointmentDate DATE NOT NULL, Status VARCHAR(20) NOT NULL CHECK(Status IN ('Booked','Completed','Cancelled')), BookingNote VARCHAR(80));\nINSERT INTO Appointments (AppointmentID, PatientID, ClinicianID, AppointmentDate, Status, BookingNote) VALUES (1, 1, 1, '2026-11-01', 'Completed', NULL),\n(2, 2, 2, '2026-11-02', 'Cancelled', 'Morning preferred'),\n(3, 3, 3, '2026-11-03', 'Booked', NULL),\n(4, 4, 1, '2026-11-04', 'Completed', 'Morning preferred'),\n(5, 5, 2, '2026-11-05', 'Cancelled', NULL),\n(6, 6, 3, '2026-11-06', 'Booked', 'Morning preferred'),\n(7, 7, 1, '2026-11-07', 'Completed', NULL),\n(8, 1, 2, '2026-11-08', 'Cancelled', 'Morning preferred'),\n(9, 2, 3, '2026-11-09', 'Booked', NULL),\n(10, 3, 1, '2026-11-10', 'Completed', 'Morning preferred'),\n(11, 4, 2, '2026-11-11', 'Cancelled', NULL),\n(12, 5, 3, '2026-11-12', 'Booked', 'Morning preferred'),\n(13, 6, 1, '2026-11-13', 'Completed', NULL),\n(14, 7, 2, '2026-11-14', 'Cancelled', 'Morning preferred'),\n(15, 1, 3, '2026-11-15', 'Booked', NULL),\n(16, 2, 1, '2026-11-16', 'Completed', 'Morning preferred'),\n(17, 3, 2, '2026-11-17', 'Cancelled', NULL),\n(18, 4, 3, '2026-11-18', 'Booked', 'Morning preferred'),\n(19, 5, 1, '2026-11-19', 'Completed', NULL),\n(20, 6, 2, '2026-11-20', 'Cancelled', 'Morning preferred'),\n(21, 7, 3, '2026-11-21', 'Booked', NULL),\n(22, 1, 1, '2026-11-22', 'Completed', 'Morning preferred'),\n(23, 2, 2, '2026-11-23', 'Cancelled', NULL),\n(24, 3, 3, '2026-11-24', 'Booked', 'Morning preferred');",
  },
  payroll: {
    title: 'Payroll',
    description:
      'Fictional payroll: 4 departments, 12 employees and 24 payments. Includes an employee without payments and an unassigned department reference.',
    tables: {
      Departments: ['DepartmentID (PK)', 'DepartmentName'],
      Employees: [
        'EmployeeID (PK)',
        'EmployeeName',
        'DepartmentID (nullable FK: Departments)',
        'MonthlySalary',
      ],
      Payments: ['PaymentID (PK)', 'EmployeeID (FK: Employees)', 'PaidOn', 'Amount'],
    },
    rowCounts: {
      Departments: 4,
      Employees: 12,
      Payments: 24,
    },
    sql: "CREATE TABLE Departments (DepartmentID INTEGER PRIMARY KEY, DepartmentName VARCHAR(60) NOT NULL UNIQUE);\nINSERT INTO Departments (DepartmentID, DepartmentName) VALUES (1, 'Teaching'),\n(2, 'IT'),\n(3, 'Finance'),\n(4, 'Facilities');\nCREATE TABLE Employees (EmployeeID INTEGER PRIMARY KEY, EmployeeName VARCHAR(60) NOT NULL, DepartmentID INTEGER REFERENCES Departments(DepartmentID), MonthlySalary DECIMAL(10,2) NOT NULL CHECK(MonthlySalary>=0));\nINSERT INTO Employees (EmployeeID, EmployeeName, DepartmentID, MonthlySalary) VALUES (1, 'Employee 01', 1, 20500),\n(2, 'Employee 02', 2, 23000),\n(3, 'Employee 03', 3, 25500),\n(4, 'Employee 04', 1, 18000),\n(5, 'Employee 05', 2, 20500),\n(6, 'Employee 06', 3, 23000),\n(7, 'Employee 07', 1, 25500),\n(8, 'Employee 08', 2, 18000),\n(9, 'Employee 09', 3, 20500),\n(10, 'Employee 10', 1, 23000),\n(11, 'Employee 11', 2, 25500),\n(12, 'Employee 12', NULL, 18000);\nCREATE TABLE Payments (PaymentID INTEGER PRIMARY KEY, EmployeeID INTEGER NOT NULL REFERENCES Employees(EmployeeID), PaidOn DATE NOT NULL, Amount DECIMAL(10,2) NOT NULL CHECK(Amount>=0));\nINSERT INTO Payments (PaymentID, EmployeeID, PaidOn, Amount) VALUES (1, 1, '2026-09-25', 20500),\n(2, 2, '2026-09-25', 23000),\n(3, 3, '2026-09-25', 25500),\n(4, 4, '2026-09-25', 18000),\n(5, 5, '2026-09-25', 20500),\n(6, 6, '2026-09-25', 23000),\n(7, 7, '2026-09-25', 25500),\n(8, 8, '2026-09-25', 18000),\n(9, 9, '2026-09-25', 20500),\n(10, 10, '2026-09-25', 23000),\n(11, 11, '2026-09-25', 25500),\n(12, 1, '2026-10-25', 20500),\n(13, 2, '2026-10-25', 23000),\n(14, 3, '2026-10-25', 25500),\n(15, 4, '2026-10-25', 18000),\n(16, 5, '2026-10-25', 20500),\n(17, 6, '2026-10-25', 23000),\n(18, 7, '2026-10-25', 25500),\n(19, 8, '2026-10-25', 18000),\n(20, 9, '2026-10-25', 20500),\n(21, 10, '2026-10-25', 23000),\n(22, 11, '2026-10-25', 25500),\n(23, 1, '2026-11-25', 20500),\n(24, 2, '2026-11-25', 23000);",
  },
  hotel: {
    title: 'Hotel Bookings',
    description:
      'Fictional hotel: 8 guests, 10 rooms and 24 bookings. Includes repeated guests, rooms without bookings and an optional checkout date.',
    tables: {
      Guests: ['GuestID (PK)', 'GuestName', 'City'],
      Rooms: ['RoomID (PK)', 'RoomType', 'NightlyRate'],
      Bookings: [
        'BookingID (PK)',
        'GuestID (FK: Guests)',
        'RoomID (FK: Rooms)',
        'CheckInDate',
        'CheckOutDate (nullable)',
        'Nights',
        'BookedRate',
      ],
    },
    rowCounts: {
      Guests: 8,
      Rooms: 10,
      Bookings: 24,
    },
    sql: "CREATE TABLE Guests (GuestID INTEGER PRIMARY KEY, GuestName VARCHAR(60) NOT NULL, City VARCHAR(60) NOT NULL);\nINSERT INTO Guests (GuestID, GuestName, City) VALUES (1, 'Guest 01', 'Pretoria'),\n(2, 'Guest 02', 'Polokwane'),\n(3, 'Guest 03', 'Pretoria'),\n(4, 'Guest 04', 'Polokwane'),\n(5, 'Guest 05', 'Pretoria'),\n(6, 'Guest 06', 'Polokwane'),\n(7, 'Guest 07', 'Pretoria'),\n(8, 'Guest 08', 'Polokwane');\nCREATE TABLE Rooms (RoomID INTEGER PRIMARY KEY, RoomType VARCHAR(30) NOT NULL, NightlyRate DECIMAL(10,2) NOT NULL CHECK(NightlyRate>=0));\nINSERT INTO Rooms (RoomID, RoomType, NightlyRate) VALUES (1, 'Double', 750),\n(2, 'Family', 1000),\n(3, 'Single', 500),\n(4, 'Double', 750),\n(5, 'Family', 1000),\n(6, 'Single', 500),\n(7, 'Double', 750),\n(8, 'Family', 1000),\n(9, 'Single', 500),\n(10, 'Double', 750);\nCREATE TABLE Bookings (BookingID INTEGER PRIMARY KEY, GuestID INTEGER NOT NULL REFERENCES Guests(GuestID), RoomID INTEGER NOT NULL REFERENCES Rooms(RoomID), CheckInDate DATE NOT NULL, CheckOutDate DATE, Nights INTEGER NOT NULL CHECK(Nights>0), BookedRate DECIMAL(10,2) NOT NULL CHECK(BookedRate>=0));\nINSERT INTO Bookings (BookingID, GuestID, RoomID, CheckInDate, CheckOutDate, Nights, BookedRate) VALUES (1, 1, 1, '2026-11-01', '2026-11-02', 1, 750),\n(2, 2, 2, '2026-11-02', '2026-11-03', 1, 1000),\n(3, 3, 3, '2026-11-03', '2026-11-04', 1, 500),\n(4, 4, 4, '2026-11-04', '2026-11-05', 1, 750),\n(5, 5, 5, '2026-11-05', '2026-11-06', 1, 1000),\n(6, 6, 6, '2026-11-06', '2026-11-07', 1, 500),\n(7, 7, 7, '2026-11-07', '2026-11-08', 1, 750),\n(8, 1, 8, '2026-11-08', '2026-11-09', 1, 1000),\n(9, 2, 1, '2026-11-09', '2026-11-10', 1, 750),\n(10, 3, 2, '2026-11-10', '2026-11-11', 1, 1000),\n(11, 4, 3, '2026-11-11', '2026-11-12', 1, 500),\n(12, 5, 4, '2026-11-12', '2026-11-13', 1, 750),\n(13, 6, 5, '2026-11-13', '2026-11-14', 1, 1000),\n(14, 7, 6, '2026-11-14', '2026-11-15', 1, 500),\n(15, 1, 7, '2026-11-15', '2026-11-16', 1, 750),\n(16, 2, 8, '2026-11-16', '2026-11-17', 1, 1000),\n(17, 3, 1, '2026-11-17', '2026-11-18', 1, 750),\n(18, 4, 2, '2026-11-18', '2026-11-19', 1, 1000),\n(19, 5, 3, '2026-11-19', '2026-11-20', 1, 500),\n(20, 6, 4, '2026-11-20', '2026-11-21', 1, 750),\n(21, 7, 5, '2026-11-21', NULL, 1, 1000),\n(22, 1, 6, '2026-11-22', NULL, 1, 500),\n(23, 2, 7, '2026-11-23', NULL, 1, 750),\n(24, 3, 8, '2026-11-24', NULL, 1, 1000);",
  },
  logistics: {
    title: 'Delivery Logistics',
    description:
      'Fictional delivery operations: 8 customers, 5 drivers and 24 shipments. Includes pending deliveries, an unassigned driver and a driver with no shipments.',
    tables: {
      Customers: ['CustomerID (PK)', 'CustomerName', 'City'],
      Drivers: ['DriverID (PK)', 'DriverName', 'Depot'],
      Shipments: [
        'ShipmentID (PK)',
        'CustomerID (FK: Customers)',
        'DriverID (nullable FK: Drivers)',
        'ShippedOn',
        'DeliveredOn (nullable)',
        'DeliveryFee',
      ],
    },
    rowCounts: {
      Customers: 8,
      Drivers: 5,
      Shipments: 24,
    },
    sql: "CREATE TABLE Customers (CustomerID INTEGER PRIMARY KEY, CustomerName VARCHAR(60) NOT NULL, City VARCHAR(60) NOT NULL);\nINSERT INTO Customers (CustomerID, CustomerName, City) VALUES (1, 'Customer 01', 'Pretoria'),\n(2, 'Customer 02', 'Johannesburg'),\n(3, 'Customer 03', 'Polokwane'),\n(4, 'Customer 04', 'Pretoria'),\n(5, 'Customer 05', 'Johannesburg'),\n(6, 'Customer 06', 'Polokwane'),\n(7, 'Customer 07', 'Pretoria'),\n(8, 'Customer 08', 'Johannesburg');\nCREATE TABLE Drivers (DriverID INTEGER PRIMARY KEY, DriverName VARCHAR(60) NOT NULL, Depot VARCHAR(60) NOT NULL);\nINSERT INTO Drivers (DriverID, DriverName, Depot) VALUES (1, 'Driver 01', 'South'),\n(2, 'Driver 02', 'North'),\n(3, 'Driver 03', 'South'),\n(4, 'Driver 04', 'North'),\n(5, 'Driver 05', 'South');\nCREATE TABLE Shipments (ShipmentID INTEGER PRIMARY KEY, CustomerID INTEGER NOT NULL REFERENCES Customers(CustomerID), DriverID INTEGER REFERENCES Drivers(DriverID), ShippedOn DATE NOT NULL, DeliveredOn DATE, DeliveryFee DECIMAL(10,2) NOT NULL CHECK(DeliveryFee>=0));\nINSERT INTO Shipments (ShipmentID, CustomerID, DriverID, ShippedOn, DeliveredOn, DeliveryFee) VALUES (1, 1, 1, '2026-11-01', '2026-11-02', 75),\n(2, 2, 2, '2026-11-02', '2026-11-03', 100),\n(3, 3, 3, '2026-11-03', '2026-11-04', 125),\n(4, 4, 4, '2026-11-04', NULL, 50),\n(5, 5, 1, '2026-11-05', '2026-11-06', 75),\n(6, 6, 2, '2026-11-06', '2026-11-07', 100),\n(7, 7, 3, '2026-11-07', '2026-11-08', 125),\n(8, 1, 4, '2026-11-08', NULL, 50),\n(9, 2, 1, '2026-11-09', '2026-11-10', 75),\n(10, 3, 2, '2026-11-10', '2026-11-11', 100),\n(11, 4, 3, '2026-11-11', '2026-11-12', 125),\n(12, 5, 4, '2026-11-12', NULL, 50),\n(13, 6, 1, '2026-11-13', '2026-11-14', 75),\n(14, 7, 2, '2026-11-14', '2026-11-15', 100),\n(15, 1, 3, '2026-11-15', '2026-11-16', 125),\n(16, 2, 4, '2026-11-16', NULL, 50),\n(17, 3, 1, '2026-11-17', '2026-11-18', 75),\n(18, 4, 2, '2026-11-18', '2026-11-19', 100),\n(19, 5, 3, '2026-11-19', '2026-11-20', 125),\n(20, 6, 4, '2026-11-20', NULL, 50),\n(21, 7, 1, '2026-11-21', '2026-11-22', 75),\n(22, 1, 2, '2026-11-22', '2026-11-23', 100),\n(23, 2, 3, '2026-11-23', '2026-11-24', 125),\n(24, 3, NULL, '2026-11-24', NULL, 50);",
  },
};
export const additionalExamples = [
  {
    id: 'library-join',
    dataset: 'library',
    title: 'Library: Join related records',
    code: 'SELECT m.MemberName, t.TitleName, l.LoanDate, l.ReturnDate FROM Loans l JOIN Members m ON m.MemberID=l.MemberID JOIN Titles t ON t.TitleID=l.TitleID ORDER BY l.LoanID;',
    explain:
      'Join each fact to its related descriptions by key. LEFT JOIN preserves optional relationships.',
  },
  {
    id: 'library-total',
    dataset: 'library',
    title: 'Library: Totals including unmatched records',
    code: 'SELECT m.MemberID, m.MemberName, COUNT(l.LoanID) AS LoanCount FROM Members m LEFT JOIN Loans l ON l.MemberID=m.MemberID GROUP BY m.MemberID,m.MemberName ORDER BY m.MemberID;',
    explain:
      'LEFT JOIN preserves entities with no matching facts. COUNT of a child key counts matches; COALESCE converts missing sums to zero.',
  },
  {
    id: 'library-rank',
    dataset: 'library',
    title: 'Library: Window function practice',
    code: 'SELECT LoanID, MemberID, LoanDate, ROW_NUMBER() OVER (PARTITION BY MemberID ORDER BY LoanDate,LoanID) AS BorrowSequence FROM Loans ORDER BY MemberID,LoanDate,LoanID;',
    explain:
      'Window functions retain detail rows. PARTITION BY restarts per entity; explicit ordering and tie breakers make sequences deterministic.',
  },
  {
    id: 'clinic-join',
    dataset: 'clinic',
    title: 'Clinic Appointments: Join related records',
    code: 'SELECT a.AppointmentID,p.PatientName,c.ClinicianName,a.AppointmentDate,a.Status FROM Appointments a JOIN Patients p ON p.PatientID=a.PatientID JOIN Clinicians c ON c.ClinicianID=a.ClinicianID ORDER BY a.AppointmentID;',
    explain:
      'Join each fact to its related descriptions by key. LEFT JOIN preserves optional relationships.',
  },
  {
    id: 'clinic-total',
    dataset: 'clinic',
    title: 'Clinic Appointments: Totals including unmatched records',
    code: 'SELECT c.ClinicianID,c.ClinicianName,COUNT(a.AppointmentID) AS AppointmentCount FROM Clinicians c LEFT JOIN Appointments a ON a.ClinicianID=c.ClinicianID GROUP BY c.ClinicianID,c.ClinicianName ORDER BY c.ClinicianID;',
    explain:
      'LEFT JOIN preserves entities with no matching facts. COUNT of a child key counts matches; COALESCE converts missing sums to zero.',
  },
  {
    id: 'clinic-rank',
    dataset: 'clinic',
    title: 'Clinic Appointments: Window function practice',
    code: 'SELECT AppointmentID,ClinicianID,AppointmentDate,ROW_NUMBER() OVER (PARTITION BY ClinicianID ORDER BY AppointmentDate,AppointmentID) AS ScheduleSequence FROM Appointments ORDER BY ClinicianID,AppointmentDate,AppointmentID;',
    explain:
      'Window functions retain detail rows. PARTITION BY restarts per entity; explicit ordering and tie breakers make sequences deterministic.',
  },
  {
    id: 'payroll-join',
    dataset: 'payroll',
    title: 'Payroll: Join related records',
    code: 'SELECT p.PaymentID,e.EmployeeName,d.DepartmentName,p.PaidOn,p.Amount FROM Payments p JOIN Employees e ON e.EmployeeID=p.EmployeeID LEFT JOIN Departments d ON d.DepartmentID=e.DepartmentID ORDER BY p.PaymentID;',
    explain:
      'Join each fact to its related descriptions by key. LEFT JOIN preserves optional relationships.',
  },
  {
    id: 'payroll-total',
    dataset: 'payroll',
    title: 'Payroll: Totals including unmatched records',
    code: 'SELECT e.EmployeeID,e.EmployeeName,COALESCE(SUM(p.Amount),0) AS TotalPaid FROM Employees e LEFT JOIN Payments p ON p.EmployeeID=e.EmployeeID GROUP BY e.EmployeeID,e.EmployeeName ORDER BY e.EmployeeID;',
    explain:
      'LEFT JOIN preserves entities with no matching facts. COUNT of a child key counts matches; COALESCE converts missing sums to zero.',
  },
  {
    id: 'payroll-rank',
    dataset: 'payroll',
    title: 'Payroll: Window function practice',
    code: 'SELECT EmployeeID,EmployeeName,DepartmentID,MonthlySalary,DENSE_RANK() OVER (PARTITION BY DepartmentID ORDER BY MonthlySalary DESC) AS SalaryRank FROM Employees ORDER BY DepartmentID,SalaryRank,EmployeeID;',
    explain:
      'Window functions retain detail rows. PARTITION BY restarts per entity; explicit ordering and tie breakers make sequences deterministic.',
  },
  {
    id: 'hotel-join',
    dataset: 'hotel',
    title: 'Hotel Bookings: Join related records',
    code: 'SELECT b.BookingID,g.GuestName,r.RoomType,b.CheckInDate,b.Nights*b.BookedRate AS BookingTotal FROM Bookings b JOIN Guests g ON g.GuestID=b.GuestID JOIN Rooms r ON r.RoomID=b.RoomID ORDER BY b.BookingID;',
    explain:
      'Join each fact to its related descriptions by key. LEFT JOIN preserves optional relationships.',
  },
  {
    id: 'hotel-total',
    dataset: 'hotel',
    title: 'Hotel Bookings: Totals including unmatched records',
    code: 'SELECT g.GuestID,g.GuestName,COALESCE(SUM(b.Nights*b.BookedRate),0) AS BookedValue FROM Guests g LEFT JOIN Bookings b ON b.GuestID=g.GuestID GROUP BY g.GuestID,g.GuestName ORDER BY g.GuestID;',
    explain:
      'LEFT JOIN preserves entities with no matching facts. COUNT of a child key counts matches; COALESCE converts missing sums to zero.',
  },
  {
    id: 'hotel-rank',
    dataset: 'hotel',
    title: 'Hotel Bookings: Window function practice',
    code: 'SELECT BookingID,GuestID,CheckInDate,SUM(Nights*BookedRate) OVER (PARTITION BY GuestID ORDER BY CheckInDate,BookingID ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS RunningBookedValue FROM Bookings ORDER BY GuestID,CheckInDate,BookingID;',
    explain:
      'Window functions retain detail rows. PARTITION BY restarts per entity; explicit ordering and tie breakers make sequences deterministic.',
  },
  {
    id: 'logistics-join',
    dataset: 'logistics',
    title: 'Delivery Logistics: Join related records',
    code: 'SELECT s.ShipmentID,c.CustomerName,d.DriverName,s.ShippedOn,s.DeliveredOn FROM Shipments s JOIN Customers c ON c.CustomerID=s.CustomerID LEFT JOIN Drivers d ON d.DriverID=s.DriverID ORDER BY s.ShipmentID;',
    explain:
      'Join each fact to its related descriptions by key. LEFT JOIN preserves optional relationships.',
  },
  {
    id: 'logistics-total',
    dataset: 'logistics',
    title: 'Delivery Logistics: Totals including unmatched records',
    code: 'SELECT d.DriverID,d.DriverName,COUNT(s.ShipmentID) AS ShipmentCount FROM Drivers d LEFT JOIN Shipments s ON s.DriverID=d.DriverID GROUP BY d.DriverID,d.DriverName ORDER BY d.DriverID;',
    explain:
      'LEFT JOIN preserves entities with no matching facts. COUNT of a child key counts matches; COALESCE converts missing sums to zero.',
  },
  {
    id: 'logistics-rank',
    dataset: 'logistics',
    title: 'Delivery Logistics: Window function practice',
    code: 'SELECT ShipmentID,CustomerID,ShippedOn,SUM(DeliveryFee) OVER (PARTITION BY CustomerID ORDER BY ShippedOn,ShipmentID ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS RunningFees FROM Shipments ORDER BY CustomerID,ShippedOn,ShipmentID;',
    explain:
      'Window functions retain detail rows. PARTITION BY restarts per entity; explicit ordering and tie breakers make sequences deterministic.',
  },
];
export const additionalExercises = [
  {
    id: 'library-total',
    dataset: 'library',
    title: 'Library: Summarise every entity',
    prompt:
      'Return every MemberID, MemberName and number of loan records, including members with none. Sort by MemberID.',
    hint: 'Start with the parent table and LEFT JOIN the facts. Group by the parent key and name. Count the child key or coalesce its sum.',
    answer:
      'SELECT m.MemberID, m.MemberName, COUNT(l.LoanID) AS LoanCount FROM Members m LEFT JOIN Loans l ON l.MemberID=m.MemberID GROUP BY m.MemberID,m.MemberName ORDER BY m.MemberID;',
    expected:
      'The result must match the requested columns and rows on both the original data and additional edge-case records.',
  },
  {
    id: 'library-absent',
    dataset: 'library',
    title: 'Library: Find missing activity',
    prompt:
      'Return TitleID and TitleName for titles with no loan records. Sort by TitleID.',
    hint: 'Use NOT EXISTS with a correlated key lookup. Do not assume an ID means that an entity has no activity.',
    answer:
      'SELECT TitleID, TitleName FROM Titles t WHERE NOT EXISTS (SELECT 1 FROM Loans l WHERE l.TitleID=t.TitleID) ORDER BY TitleID;',
    expected:
      'The result must match the requested columns and rows on both the original data and additional edge-case records.',
  },
  {
    id: 'library-rank',
    dataset: 'library',
    title: 'Library: Write a window query',
    prompt:
      'Reproduce the columns and calculations in the Library window-function worked example, using the same partition and sort order.',
    hint: 'Use the worked example as a reference. Retain every detail row and use the stated deterministic window order.',
    answer:
      'SELECT LoanID, MemberID, LoanDate, ROW_NUMBER() OVER (PARTITION BY MemberID ORDER BY LoanDate,LoanID) AS BorrowSequence FROM Loans ORDER BY MemberID,LoanDate,LoanID;',
    expected:
      'The result must match the requested columns and rows on both the original data and additional edge-case records.',
  },
  {
    id: 'clinic-total',
    dataset: 'clinic',
    title: 'Clinic Appointments: Summarise every entity',
    prompt:
      'Return every ClinicianID, ClinicianName and count of all appointment records, including cancellations and clinicians with none. Sort by ClinicianID.',
    hint: 'Start with the parent table and LEFT JOIN the facts. Group by the parent key and name. Count the child key or coalesce its sum.',
    answer:
      'SELECT c.ClinicianID,c.ClinicianName,COUNT(a.AppointmentID) AS AppointmentCount FROM Clinicians c LEFT JOIN Appointments a ON a.ClinicianID=c.ClinicianID GROUP BY c.ClinicianID,c.ClinicianName ORDER BY c.ClinicianID;',
    expected:
      'The result must match the requested columns and rows on both the original data and additional edge-case records.',
  },
  {
    id: 'clinic-absent',
    dataset: 'clinic',
    title: 'Clinic Appointments: Find missing activity',
    prompt:
      'Return PatientID and PatientName for patients with no appointment records of any status. Sort by PatientID.',
    hint: 'Use NOT EXISTS with a correlated key lookup. Do not assume an ID means that an entity has no activity.',
    answer:
      'SELECT PatientID,PatientName FROM Patients p WHERE NOT EXISTS (SELECT 1 FROM Appointments a WHERE a.PatientID=p.PatientID) ORDER BY PatientID;',
    expected:
      'The result must match the requested columns and rows on both the original data and additional edge-case records.',
  },
  {
    id: 'clinic-rank',
    dataset: 'clinic',
    title: 'Clinic Appointments: Write a window query',
    prompt:
      'Reproduce the columns and calculations in the Clinic Appointments window-function worked example, using the same partition and sort order.',
    hint: 'Use the worked example as a reference. Retain every detail row and use the stated deterministic window order.',
    answer:
      'SELECT AppointmentID,ClinicianID,AppointmentDate,ROW_NUMBER() OVER (PARTITION BY ClinicianID ORDER BY AppointmentDate,AppointmentID) AS ScheduleSequence FROM Appointments ORDER BY ClinicianID,AppointmentDate,AppointmentID;',
    expected:
      'The result must match the requested columns and rows on both the original data and additional edge-case records.',
  },
  {
    id: 'payroll-total',
    dataset: 'payroll',
    title: 'Payroll: Summarise every entity',
    prompt:
      'Return every EmployeeID, EmployeeName and total payment amount. Return zero for employees without payments. Sort by EmployeeID.',
    hint: 'Start with the parent table and LEFT JOIN the facts. Group by the parent key and name. Count the child key or coalesce its sum.',
    answer:
      'SELECT e.EmployeeID,e.EmployeeName,COALESCE(SUM(p.Amount),0) AS TotalPaid FROM Employees e LEFT JOIN Payments p ON p.EmployeeID=e.EmployeeID GROUP BY e.EmployeeID,e.EmployeeName ORDER BY e.EmployeeID;',
    expected:
      'The result must match the requested columns and rows on both the original data and additional edge-case records.',
  },
  {
    id: 'payroll-absent',
    dataset: 'payroll',
    title: 'Payroll: Find missing activity',
    prompt:
      'Return EmployeeID and EmployeeName for employees without any payment records. Sort by EmployeeID.',
    hint: 'Use NOT EXISTS with a correlated key lookup. Do not assume an ID means that an entity has no activity.',
    answer:
      'SELECT EmployeeID,EmployeeName FROM Employees e WHERE NOT EXISTS (SELECT 1 FROM Payments p WHERE p.EmployeeID=e.EmployeeID) ORDER BY EmployeeID;',
    expected:
      'The result must match the requested columns and rows on both the original data and additional edge-case records.',
  },
  {
    id: 'payroll-rank',
    dataset: 'payroll',
    title: 'Payroll: Write a window query',
    prompt:
      'Reproduce the columns and calculations in the Payroll window-function worked example, using the same partition and sort order.',
    hint: 'Use the worked example as a reference. Retain every detail row and use the stated deterministic window order.',
    answer:
      'SELECT EmployeeID,EmployeeName,DepartmentID,MonthlySalary,DENSE_RANK() OVER (PARTITION BY DepartmentID ORDER BY MonthlySalary DESC) AS SalaryRank FROM Employees ORDER BY DepartmentID,SalaryRank,EmployeeID;',
    expected:
      'The result must match the requested columns and rows on both the original data and additional edge-case records.',
  },
  {
    id: 'hotel-total',
    dataset: 'hotel',
    title: 'Hotel Bookings: Summarise every entity',
    prompt:
      'Return every GuestID, GuestName and sum of Nights multiplied by BookedRate across their bookings. Return zero for guests without bookings. Sort by GuestID.',
    hint: 'Start with the parent table and LEFT JOIN the facts. Group by the parent key and name. Count the child key or coalesce its sum.',
    answer:
      'SELECT g.GuestID,g.GuestName,COALESCE(SUM(b.Nights*b.BookedRate),0) AS BookedValue FROM Guests g LEFT JOIN Bookings b ON b.GuestID=g.GuestID GROUP BY g.GuestID,g.GuestName ORDER BY g.GuestID;',
    expected:
      'The result must match the requested columns and rows on both the original data and additional edge-case records.',
  },
  {
    id: 'hotel-absent',
    dataset: 'hotel',
    title: 'Hotel Bookings: Find missing activity',
    prompt:
      'Return RoomID and RoomType for rooms with no booking records. Sort by RoomID.',
    hint: 'Use NOT EXISTS with a correlated key lookup. Do not assume an ID means that an entity has no activity.',
    answer:
      'SELECT RoomID,RoomType FROM Rooms r WHERE NOT EXISTS (SELECT 1 FROM Bookings b WHERE b.RoomID=r.RoomID) ORDER BY RoomID;',
    expected:
      'The result must match the requested columns and rows on both the original data and additional edge-case records.',
  },
  {
    id: 'hotel-rank',
    dataset: 'hotel',
    title: 'Hotel Bookings: Write a window query',
    prompt:
      'Reproduce the columns and calculations in the Hotel Bookings window-function worked example, using the same partition and sort order.',
    hint: 'Use the worked example as a reference. Retain every detail row and use the stated deterministic window order.',
    answer:
      'SELECT BookingID,GuestID,CheckInDate,SUM(Nights*BookedRate) OVER (PARTITION BY GuestID ORDER BY CheckInDate,BookingID ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS RunningBookedValue FROM Bookings ORDER BY GuestID,CheckInDate,BookingID;',
    expected:
      'The result must match the requested columns and rows on both the original data and additional edge-case records.',
  },
  {
    id: 'logistics-total',
    dataset: 'logistics',
    title: 'Delivery Logistics: Summarise every entity',
    prompt:
      'Return every DriverID, DriverName and number of assigned shipment records, including drivers with none. Sort by DriverID.',
    hint: 'Start with the parent table and LEFT JOIN the facts. Group by the parent key and name. Count the child key or coalesce its sum.',
    answer:
      'SELECT d.DriverID,d.DriverName,COUNT(s.ShipmentID) AS ShipmentCount FROM Drivers d LEFT JOIN Shipments s ON s.DriverID=d.DriverID GROUP BY d.DriverID,d.DriverName ORDER BY d.DriverID;',
    expected:
      'The result must match the requested columns and rows on both the original data and additional edge-case records.',
  },
  {
    id: 'logistics-absent',
    dataset: 'logistics',
    title: 'Delivery Logistics: Find missing activity',
    prompt:
      'Return CustomerID and CustomerName for customers with no shipment records. Sort by CustomerID.',
    hint: 'Use NOT EXISTS with a correlated key lookup. Do not assume an ID means that an entity has no activity.',
    answer:
      'SELECT CustomerID,CustomerName FROM Customers c WHERE NOT EXISTS (SELECT 1 FROM Shipments s WHERE s.CustomerID=c.CustomerID) ORDER BY CustomerID;',
    expected:
      'The result must match the requested columns and rows on both the original data and additional edge-case records.',
  },
  {
    id: 'logistics-rank',
    dataset: 'logistics',
    title: 'Delivery Logistics: Write a window query',
    prompt:
      'Reproduce the columns and calculations in the Delivery Logistics window-function worked example, using the same partition and sort order.',
    hint: 'Use the worked example as a reference. Retain every detail row and use the stated deterministic window order.',
    answer:
      'SELECT ShipmentID,CustomerID,ShippedOn,SUM(DeliveryFee) OVER (PARTITION BY CustomerID ORDER BY ShippedOn,ShipmentID ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS RunningFees FROM Shipments ORDER BY CustomerID,ShippedOn,ShipmentID;',
    expected:
      'The result must match the requested columns and rows on both the original data and additional edge-case records.',
  },
];
export const additionalFixtures = {
  library:
    "INSERT INTO Members VALUES(99,'Member Edge','New City'); INSERT INTO Titles VALUES(99,'Edge Title','Computing'); INSERT INTO Loans VALUES(99,99,11,'2026-12-01',NULL);",
  clinic:
    "INSERT INTO Patients VALUES(99,'Patient Edge','New City'); INSERT INTO Clinicians VALUES(99,'Clinician Edge','General'); INSERT INTO Appointments VALUES(99,8,4,'2026-12-01','Booked',NULL);",
  payroll:
    "INSERT INTO Departments VALUES(99,'Edge Department'); INSERT INTO Employees VALUES(99,'Employee Edge',99,20000); INSERT INTO Payments VALUES(99,12,'2026-12-25',1000);",
  hotel:
    "INSERT INTO Guests VALUES(99,'Guest Edge','New City'); INSERT INTO Rooms VALUES(99,'Single',800); INSERT INTO Bookings VALUES(99,8,9,'2026-12-01',NULL,2,700);",
  logistics:
    "INSERT INTO Customers VALUES(99,'Customer Edge','New City'); INSERT INTO Drivers VALUES(99,'Driver Edge','North'); INSERT INTO Shipments VALUES(99,8,5,'2026-12-01',NULL,75);",
};
