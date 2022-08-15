if [[ $VERCEL_ENV == "production" ]]; 
then export PULUMI_ENV="prod" 
else export PULUMI_ENV="dev" 
fi

echo $PULUMI_ENV

curl -fsSL https://get.pulumi.com | sh 
export PATH=$PATH:~/.pulumi/bin && export PATH=$PATH:vercel/.pulumi/bin 
cd infra 
npm ci --include=dev
export AWS_SECRET_ACCESS_KEY=$AWS_SECRET
export AWS_ACCESS_KEY_ID=$AWS_ACCESS
export AWS_REGION=us-east-1 
pulumi stack select $PULUMI_ENV
pulumi up --yes
pulumi stack output -j >| ../stack.json