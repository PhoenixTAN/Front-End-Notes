# Statistical Multiplexing

Statistical Multiplexing is a multiplexing technique that allows information from a number of channels to be combined for transmission over a single channel.

---

Two queues or not two queues? The benefit of statistical multiplexing

https://witestlab.poly.edu/blog/two-queues-or-not-two-queues-the-benefit-of-statistical-multiplexing/

Wiki: Statistical time-division multiplexing

https://en.wikipedia.org/wiki/Statistical_time-division_multiplexing#:~:text=Statistical%20multiplexing%20is%20a%20type,digital%20channels%20or%20data%20streams.



## Wiki Introduction
Statistical multiplexing is a type of communication link sharing, very similar to dynamic bandwidth allocation (DBA). 

**In statistical multiplexing, a communication channel is divided into an arbitrary number of variable bitrate digital channels or data streams.**

The link sharing is adapted to the instantaneous traffic demands of the data streams that are transferred over each channel. This is `an alternative` to creating a fixed sharing of a link, such as in general time division multiplexing (TDM) and frequency division multiplexing (FDM). 

When performed correctly, statistical multiplexing can provide a link utilization improvement, called the `statistical multiplexing gain`.

## Comparison with static TDM
Time domain statistical multiplexing (packet mode communication) is similar to time-division multiplexing (TDM), except that, rather than assigning a data stream to the same recurrent time slot in every TDM, each data stream is assigned time slots (of fixed length) or data frames (of variable lengths) that often appear to be scheduled in a randomized order, and experience varying delay (while the delay is fixed in TDM).


## Experiment
In this experiment, we compare statistical multiplexing with time or frequency division multiplexing.

Assume we have m separate identically distributed and independent Poisson arrival streams each with parameter λ/m (i.e. packets in each stream arrive at an average rate of λ/m packets per second, with each stream having independent, exponentially distributed interarrival times.) We can serve these with two possible configurations:


