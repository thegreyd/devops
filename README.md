## steps
- clone repo
- `pip install --user git+git://github.com/ansible/ansible.git@devel` install latest ansible
- `vars/password.yml` Ansible vault file with (ec2, jenkins, mongo..) credentials
- `~/password.txt` File with your vault password
- Run:
    + `ansible-playbook provision.yaml --vault-password-file ~/password.txt`
    + `ansible-playbook jenkins.yaml -i inventory --vault-password-file ~/password.txt`

## Check
- `ip:8080` access jenkins
- `ip` access checkbox
- `ip:9090/iTrust` access iTrust

## Debug
- `ssh -i <pem_file> ubuntu@ip` ssh into ec2
- `/var/lib/jenkins` files on jenkins server - deployment playbooks and jobs
- `ansible-vault view <vault_file>`
- `ansible-vault edit <vault_file>`
- `awseducate.com/login` manage aws

## Todo
- separate provision tasks into playbook
    + `provision.yml` provision 3 ec2 instances and write them to var file
        * jenkins
        * itrust
        * checkbox
    + `main.yml` create jenkins server, deploy checkbox and itrust. reads from the var file to create inventory