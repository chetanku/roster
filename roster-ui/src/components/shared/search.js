export const Searching = (searchparams, data, component) => {

    const value = searchparams.trim();
    let items = data.filter((item) => {
        if (component === "ec2") {
            return (
                item.Name.includes(value.toLowerCase()) ||
                item.InstanceId.includes(value) ||
                item.PrivateIpAddress.includes(value)
            );
        }
        if (component === "emr") {
            return (
                item.ClusterId.includes(value) ||
                item.Name.includes(value.toLowerCase())
            );
        }
        if (component === "elb") {
            return (
                item.LoadBalancerName.includes(value.toLowerCase()) ||
                item.DNSName.includes(value.toLowerCase())
            );
        }
        if (component === "rds") {
            return (
                item.DBInstanceIdentifier.includes(value.toLowerCase()) ||
                item.Engine.includes(value.toLowerCase())
            );
        }
        if (component === "msk") {
            return (
                item.ClusterName.includes(value.toLowerCase())
            );
        }
        if (component === "subnets") {
            return (
                item.SubnetId.includes(value.toLowerCase())
            );
        }
    });
    return items;
}