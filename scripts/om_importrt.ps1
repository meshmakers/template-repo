
# Import adapters
octo-cli -c ImportRt -f ./../data/_general/rt-adapters-mesh.yaml -w

# Import pipelines
octo-cli -c ImportRt -f ./../data/_general/rt-pipeline-excel.yaml -w

# Import queries
octo-cli -c ImportRt -f ./../data/_queries/_trees.yaml
