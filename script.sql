USE [APP]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 09/10/2023 14:40:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[idUsuario] [int] IDENTITY(1,1) NOT NULL,
	[NombreUS] [varchar](100) NULL,
	[contraseñaUS] [varchar](150) NULL,
	[EmailUS] [varchar](150) NULL
) ON [PRIMARY]
GO
