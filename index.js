const k8s = require('@kubernetes/client-node');

const stormInterval = process.env.STORM_INTERVAL || 1500;
const namespace = process.env.STORM_NAMESPACE || 'default';
const dryRun = process.env.DRY_RUN || 'true';


const kc = new k8s.KubeConfig();
// TODO: figure out how to run this in the cluster
kc.loadFromCluster();
// kc.loadFromDefault();


const k8sApi = kc.makeApiClient(k8s.Core_v1Api);

async function main() {
console.log('The storm has begun');
  
  const pods = await getNsPodNames(namespace);
  const randomPod = Math.floor(Math.random()*pods.length);

  console.log(`Total pods running: ${pods.length}`);
  console.log(`Pod selected: ${pods[randomPod]}`);

  deleteNsPod(pods[randomPod], namespace, dryRun);
}

setInterval(main, stormInterval);

/**
 * getNsPodNames Get a list of all pods in
 * a specific namespace
 *
 * @param namespace The kubernetes namespace
 * @returns {pods} An array of pods
 */
async function getNsPodNames(namespace) {
  let pods = [];
  try {
    const rawPods = await k8sApi.listNamespacedPod(namespace);
    const items = rawPods.body.items;

    for (let item in items) {
      pods.push(items[item].metadata.name);
    };
  }
  catch(error) {
    console.error(error);
  }

  return pods
}

/**
 * deleteNsPod
 *
 * @param pod The pod to delete
 * @param namespace the namespace where the pod is
 * @returns {undefined}
 */
async function deleteNsPod(pod, namespace, dryRun) {
  let response;

  if(dryRun) {
    response = await k8sApi.deleteNamespacedPod(pod, namespace, undefined, undefined, 'All');
    console.log(`Would have deleted ${pod}`);
  } else {
    response = await k8sApi.deleteNamespacedPod(pod, namespace);
    console.log(`Deleted pod ${pod}`);
  }
};
