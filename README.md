Encryption & Decryption Mechansim
Middelware request and response modification
adding exception middleware
Integrate creation inside web app
upload chunk instert data
combin chunk database logic call save as session.json 
edit event.json to session.json inside .js file in api.
create convertion session.json to WebM format
create convertion from WebM to Mp4 format


CREATE TABLE [dbo].[txnvideosubmit](
	[sessionId] [uniqueidentifier] NOT NULL,
	[appname] [nvarchar](100) NULL,
	[IsActive] [bit] NOT NULL,
	[Iscombinchunk] [bit] NOT NULL,
	[IsMp4converstion] [bit] NOT NULL,
	[CreationAt] [datetime] NOT NULL,
	[LastModifiedAt] [datetime] NULL,
 CONSTRAINT [PK_txnvideosubmit] PRIMARY KEY CLUSTERED 
(
	[sessionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[txnvideosubmit] ADD  CONSTRAINT [DF_txnvideosubmit_sessionId]  DEFAULT (newsequentialid()) FOR [sessionId]
GO

ALTER TABLE [dbo].[txnvideosubmit] ADD  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[txnvideosubmit] ADD  DEFAULT ((0)) FOR [Iscombinchunk]
GO

ALTER TABLE [dbo].[txnvideosubmit] ADD  DEFAULT ((0)) FOR [IsMp4converstion]
GO

ALTER TABLE [dbo].[txnvideosubmit] ADD  DEFAULT (getdate()) FOR [CreationAt]
GO




CREATE TABLE [dbo].[txnvideoupload](
	[uploadId] [int] IDENTITY(1,1) NOT NULL,
	[chunknumber] [int] NULL,
	[chunknofilename] [nvarchar](100) NULL,
	[appname] [nvarchar](100) NULL,
	[sessionid] [nvarchar](250) NULL,
	[CreationAt] [datetime] NULL,
 CONSTRAINT [PK_txnvideoupload] PRIMARY KEY CLUSTERED 
(
	[uploadId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO






CREATE TABLE [dbo].[mstSource](
	[SourceId] [int] IDENTITY(1,1) NOT NULL,
	[SourceName] [varchar](50) NULL,
	[IsActive] [bit] NULL,
	[CreatedAt] [datetime] NULL,
	[EncryptionKey] [nvarchar](50) NULL,
 CONSTRAINT [PK_mstSource] PRIMARY KEY CLUSTERED 
(
	[SourceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO



select * from mstSource where SourceName = ''

insert into mstSource(SourceName,IsActive,CreatedAt,EncryptionKey)
Values('BAWC',1 , GETDATE() , 'R8v#2Kp!9xL@4mQ7zT$6wN1cY5bH3fD9')





