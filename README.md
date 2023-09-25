![main](https://github.com/chajiiiii/Simon-Game/assets/93015253/1deea10f-6a9d-45a9-ac5e-5b5c6806e10c)

# My Diet Diary

## Description

"My Diet Diary" is a straightforward web application designed for diet tracking. Users can log their daily meals and dietary details, create new entries, edit existing records, and delete entries as necessary. Additionally, users have the option to manage their profiles, including adding a short bio and uploading an avatar.

This project was developed independently and completed within a seven-day timeframe.

[📖Click here to check out the app🍕](https://my-dd-da037262feac.herokuapp.com/)

## Features

- Create a new post with details such as meal date, meal type, meal time, weight, and additional notes.
- View all posts in chronological order, grouped by date and sorted by meal type.
- Edit or delete posts to keep the diary up-to-date.
- Create or update a profile with a personalized bio and an avatar.

## Planning

Trello Link: https://trello.com/b/MiPZmsW8/project-2-my-diet-diary

### Wireframes & ERD

![Main Page](https://github.com/chajiiiii/my-diet-diary/assets/93015253/af3d62d3-7d4d-4fb7-bdcf-103e35757bc0)

![Main Page After Log-In](https://github.com/chajiiiii/my-diet-diary/assets/93015253/618a1d57-94f5-40db-a895-a53bbbe03e62)

![ERD of Project 2_ My Diet Diary](https://github.com/chajiiiii/my-diet-diary/assets/93015253/f44f49ee-005d-4068-88de-df797ad036ca)

## Getting Started

1. Clone this repository to your local machine.
2. Install the required dependencies using npm install.
3. Set up a MongoDB database and provide the connection URL in the appropriate configuration file.
4. Start the server using npm start.
5. Access the application in your web browser at http://localhost:3000.

## App Screenshots

<img src="https://github.com/chajiiiii/Simon-Game/assets/93015253/31539af1-fe3d-4d03-a9cb-3c1e5137a67f" width="100%">

<img src="https://github.com/chajiiiii/Simon-Game/assets/93015253/e35ae6d5-bbd1-49db-97d2-57e94818f3a8" width="100%">

<img src="https://github.com/chajiiiii/Simon-Game/assets/93015253/e41556a8-3d07-4c3d-99ba-db7ac441bb4d" width="50%">

## Key Learnings & Wins

### - Displaying posts by dates and meal types

```JavaScript
async function index(req, res) {
  try {
    const mealTypeOrder = {
      breakfast: 1,
      lunch: 2,
      dinner: 3,
      snack: 4,
    };

    const posts = await Post.find({ profile: profile._id }).sort({
      mealDate: -1,
      mealType: 1,
    });

    const dateGroups = {};

    posts.forEach((post) => {
      const dateKey = post.mealDate.toDateString();

      if (!dateGroups[dateKey]) {
        dateGroups[dateKey] = [];
      }

      dateGroups[dateKey].push(post);
    });

    const sortedDateGroups = Object.entries(dateGroups).sort(
      ([dateA], [dateB]) => new Date(dateB) - new Date(dateA)
    );

    sortedDateGroups.forEach(([date, posts]) => {
      posts.sort((a, b) => {
        const mealTypeA = a.mealType.toLowerCase();
        const mealTypeB = b.mealType.toLowerCase();

        return mealTypeOrder[mealTypeA] - mealTypeOrder[mealTypeB];
      });
    });

    res.render("posts/index", {
      dateGroups: sortedDateGroups,
      title: "My Diet Diary",
      posts,
      profile: profile,
    });
  } catch (err) {
    console.log(err);
    res.redirect("posts");
  }
}
```

I organized and displayed posts in a user-friendly manner, first by date and then by meal type, with proper error handling in place to ensure a smooth user experience.

## Challenges

This was my first time working with backend development, and I encountered some difficulties while trying to analyze the user object and establish links with the post and profile models.

## Technologies

- HTML
- CSS
- JavaScript
- Express.js
- Node.js
- MongoDB
- Mongoose
- EJS
- Passport.js
- Git

## Planned Future Enhancements

- Implement a calendar view for visualizing your meal history.
- Create a gallery view to showcase images of your meals.
