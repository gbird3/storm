# Storm

Chaos monkey type tool that allows you to specify a namespace, interval, and whether or not to run as a DryRun. Will delete a random pod at a set interval.


## Configuration

Storm accepts different environment variables:

- STORM_INTERVAL
  - The interval at which the "storm" will occur
- STORM_NAMESPACE
  - The namespace to delete the pod from
- DRY_RUN
  - A boolean that determines whether to actually delete the pods or just log out what pod would have been deleted. 


## Next Steps

~~1. Kubernetes files for running in the cluster~~
1. Allow user to specify multiple (or all) namespaces
1. Allow user to exclude certain pods
1. Allow user to specify "random interval"

