# TinyUrl Project Server

TinyUrl is a service that allows link shortening and tracking clicks on shortened links.

## Key Features
- Link shortening.
- Tracking clicks (date, IP address, `target` parameter value).
- Segmentation by advertising sources.
- Uses MongoDB.

## Data Structure

### Links Collection Structure
```javascript
{
  _id: ObjectId,
  originalUrl: String,
  clicks: [
    {
      insertedAt: Date,
      ipAddress: String,
      targetParamValue: String
    }
  ],
  targetParamName: String,
  targetValues: [
    {
      name: String,
      value: String
    }
  ]
}
```

# TinyUrl Project client



TinyURL Analytics Dashboard is a web application providing analytics for short URLs created using the TinyURL service. Users can input a short URL to get insights about the clicks on that link.

## Features

- **Retrieve Click Data**: Input a short URL to get click analytics.
- **Visualize Data**: Display click data in bar, pie, and line charts using Chart.js.
- **Click Data by Source**: View clicks per source.
- **Total Clicks per User's Links**: See total clicks for all links of a user.
- **Clicks by Day of the Week**: Analyze click distribution by day.

## Getting Started

### Prerequisites

- Node.js (version 14.x or later)
- npm (version 6.x or later)

### Installation

1. Clone the repository:

-   git clone https://github.com/miricoen/NodeProject
-   cd tinyurl-analytics-dashboard
