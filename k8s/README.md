# Install and Configure Kubernetes

1. Install a Kubernetes cluster using Minikube or a cloud provider like AWS, Google Kubernetes Engine, etc.

2. Install Helm, the package manager for Kubernetes:

```console
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

3. Add the Ingress Nginx Helm repository and update Helm:

```console 
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
```

4. Install the Nginx Ingress Controller using Helm in the ingress-nginx namespace:

```console 
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace \
  -f "ingress-nginx-values.yml" 
```

5. Create the api-backend namespace and services:

```console
kubectl apply -f "phonebook-deployment.yml" 
```

6. Configure Nginx Ingress rules for the backend services:

```console
kubectl apply -f "phonebook-ingress.yml" 
```

7. Create ConfigMap and secrets:

```console  
kubectl apply -f "phonebook-env.yml" 
```  

8. Install Cert-Manager to manage SSL certificates:

```console   
helm repo add jetstack https://charts.jetstack.io
helm repo update 
helm install cert-manager jetstack/cert-manager --namespace cert-manager --create-namespace --set installCRDs=true
```

9. Create a DigitalOcean secret with your access token:

```console 
DO_API_TOKEN="YOU_DO_TOKEN"
kubectl create secret generic "digitalocean-dns" \
  --namespace api-backend \
  --from-literal=access-token="$DO_API_TOKEN"
```  

10. Install the Issuer:  

```console  
kubectl apply -f phonebook-cert.yml
```

11. Install the kube-prometheus-stack to monitor your cluster:

```console  
kubectl apply -f kube-prometheus/setup/  
kubectl apply -f kube-prometheus/ 
```

12. Expose the Grafana dashboard:

```console    
kubectl -n monitoring port-forward svc/grafana 3000
```

13. Expose the Prometheus dashboard:  

```console  
kubectl -n monitoring port-forward svc/prometheus-operated 9090
```