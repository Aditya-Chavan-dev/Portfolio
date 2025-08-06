-- Create universal portfolio database
CREATE DATABASE portfoliodb;
GO
USE portfoliodb;
GO

CREATE TABLE visits (
    id INT IDENTITY(1,1) PRIMARY KEY,
    company_name NVARCHAR(255) NOT NULL,
    timestamp DATETIME DEFAULT GETDATE()
);
GO
