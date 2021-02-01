-- Tables
CREATE TABLE Person
(
    "id_person" integer NOT NULL,
    "fio" varchar(255) NOT NULL
);
-- Alters
ALTER TABLE Person ADD CONSTRAINT PK_T_PERSON
PRIMARY KEY (Id_person);

INSERT INTO Person (id_person, fio) VALUES
    (1, 'Иванов И.И.'),
    (2, 'Петров И.И.'),
	(3, 'Сидоров. И.И.'),
	(4, 'Сергеев И.И.');

-- Tables
CREATE TABLE Portfolio
(
    "portfolioid" integer NOT NULL,
    "pportfolio_name" varchar(255) NOT NULL,
    "sign_date" timestamp NOT NULL,
    "end_date" timestamp NOT NULL
);

-- Alters
ALTER TABLE Portfolio ADD CONSTRAINT PK_T_PORTFOLIO
PRIMARY KEY (PortfolioID);

INSERT INTO Portfolio (portfolioid, pportfolio_name, sign_date, end_date) VALUES
    (1, 'PORTFOLIO_1', '01.01.2011', '21.01.2013'),
	(2, 'PORTFOLIO_2', '06.05.2012', '20.09.2012'),
	(3, 'PORTFOLIO_3', '21.11.2012', '16.03.2013'),
	(4, 'PORTFOLIO_4', '01.12.2012', '11.06.2013');
	
-- Tables
CREATE TABLE Debt
(
    "id_debt" integer NOT NULL,
    "person" integer NOT NULL,
    "debt_sum" integer NOT NULL,
    "portfolio" integer NOT NULL
);
-- Alters
ALTER TABLE Debt ADD CONSTRAINT PK_T_DEBT
PRIMARY KEY (Id_debt);

ALTER TABLE Debt ADD CONSTRAINT FK_T_PERSON_T_DEBT_Person
FOREIGN KEY(Person) REFERENCES Person (Id_person);

ALTER TABLE Debt ADD CONSTRAINT FK_T_PORTFOLIO_T_DEBT_Portfolio
FOREIGN KEY(Portfolio) REFERENCES Portfolio (PortfolioID);

INSERT INTO Debt (person, id_debt, portfolio, debt_sum) VALUES
    (1, 1, 1, 100),
	(1, 2, 2, 200),
	(3, 3, 1, 300),
	(4, 4, 3, 400);

-- Tables
CREATE TABLE Calendar
(
    "cal_date" timestamp NULL
);
INSERT INTO Calendar (cal_date) VALUES
    ('01.01.2011'),('01.02.2011'),('01.03.2011'),('01.04.2011'),('01.05.2011'),
	('01.06.2011'),('01.07.2011'),('01.08.2011'),('01.09.2011'),('01.10.2011'),
	('01.11.2011'),('01.12.2011');

-- Tables
CREATE TABLE Payment
(
    "debt" integer NOT NULL,
    "payment_sum" integer NULL,
    "date" timestamp NULL
);
-- Alters
ALTER TABLE Payment ADD CONSTRAINT PK_T_PAYMENT
PRIMARY KEY (PaymentID);

ALTER TABLE Payment ADD CONSTRAINT FK_T_DEBT_T_PAYMENT_Debt
FOREIGN KEY(Debt) REFERENCES Debt (Id_debt);

INSERT INTO payment (debt, payment_sum, date) VALUES
    (1, 10, '12.05.2012'),
	(1, 20, '28.05.2012'),
	(3, 30, '10.06.2012'),
	(4, 10, '01.12.2012');
	(1, 10, '12.05.2011'),
	(1, 20, '28.05.2011'),
	(3, 30, '10.06.2011'),
	(4, 10, '01.12.2011');

