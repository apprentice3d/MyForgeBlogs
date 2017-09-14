




Having this set up, any time when the pivot_seconds is rotated, update the SecondArm position and rotation, by grabbing the position and rotation of the dummy_seconds object.


That's it!
By repeating same steps for MinuteArm and HourArm, you have a model of a desk clock showing a real time. 

Now you have the necessary ingredient to make you models even more appealing, by embedding small animations or functionality illustrations. At least a clock shop is ready to go. 

At this step, some of you may look skeptical at this approach and wander what it is a big deal about it, as it is not much easier than just creating a matrix out of 3 matrices. Don't worry, you are perfectly right ... at some extent ... that till you have to deal with a more complex chained transformations, and to illustrate this, I invite you to reinfoce our knowledge on a more complex model in [Chained transforms]() post.




# Chained transforms

In [previous article]() I introduced an indirect way of transforming components, that allows you to avoid dealing with affine transformations directly and rely on computation results "generated" by the three.js parent-chind relation.

To reinforce this approach and illustrate its benefits in a more complex use case, in what follows, I invite you to join me in my endaviour of bringing some interaction to a bit more complex model, that I called GiroWatch.

Thus, our requirements are the following:

1. implement hour, minute, second rotations, to reflect current time.

1. implement a manipulator (slider) that a user can interact with, to change the frme rotations.

The first point is quite simple, as we already achieved similar thing in [previous article](), but we will return to this requirement toward the end, as the Pin component is now not independent as in previous example, but a child of ClockBody.

Thus, let us start by mapping the "imaginative" hierarchical tree:

    [Center]
    - [MainFrame]
        - [SecondFrame]
            - [ThirdFrame]
            - [ClockBody]
                - [Glass]
                - [HourDial]
                - [Pin]
                    - [SecondsArm]
                    - [MinuteArm]
                    - [HourArm]

I came up with a "giroscopic" thing on purpose, as it's magic nature cannot be always resolved by a streightforward hierarchy - some parent rotations must be propagated, while some of them should be ignored. This becomes quite confusing when using the matrix transformations, while in our case it will be dealt fairly easy, through creation of a proxy object that will compensate the unwanted transformations.








.
.
.
.
.
.
.
.
.

