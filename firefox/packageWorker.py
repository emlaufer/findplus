
workers = {"nlpWorker.src.js": {
    "target": "nlpWorker.js", 
    "dependencies": ["js/compromise.js"]
    }
}

def compile_workers(workers):
    for workerFile in workers:
        string = ''
        for dependency in workers[workerFile]['dependencies']:
            with open(dependency, 'r') as f:
                string += f.read()
        
        with open(workerFile, 'r') as f:
            string += f.read()
        
        with open(workers[workerFile]['target'], 'w') as f:
            f.write(string)


compile_workers(workers)
