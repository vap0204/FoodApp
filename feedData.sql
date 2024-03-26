/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Id]
      ,[Name]
      ,[Calories]
      ,[Protein]
      ,[Fat]
      ,[Carbs]
  FROM [FoodApp_db].[dbo].[Foods]

INSERT INTO [FoodApp_db].[dbo].[Foods] (Name, Calories, Protein, Fat, Carbs) VALUES
('Apple', 52, 0, 0, 14),
('Banana', 89, 1, 0, 23),
('Chicken Breast', 165, 31, 3, 0),
('Salmon', 206, 22, 13, 0),
('Brown Rice', 112, 2, 0, 23),
('Broccoli', 34, 2, 0, 6),
('Oatmeal', 68, 2, 1, 12),
('Egg (Large)', 72, 6, 4, 0),
('Spinach', 23, 2, 0, 3),
('Whole Wheat Bread', 247, 12, 2, 47),
('Avocado', 160, 2, 15, 9),
('Greek Yogurt', 59, 10, 0, 3),
('Almonds', 206, 8, 18, 6),
('Black Beans', 114, 8, 0, 20),
('Cottage Cheese', 163, 28, 4, 3),
('Quinoa', 120, 4, 2, 21),
('Kale', 33, 3, 0, 6),
('Sweet Potato', 86, 2, 0, 20),
('Tuna', 94, 20, 1, 0),
('Peanut Butter', 94, 4, 8, 3);